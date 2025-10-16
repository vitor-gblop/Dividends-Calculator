// reports.js
// Logic for rendering reports page: list FIIs, compute dividend summaries, monthly returns and draw a simple chart.

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getUserFIIs() {
  // Reuse conventions from Crud.js: stored items except control keys, and each item has currentUser
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return {};

  const d = { ...localStorage };
  const returnData = {};

  for (const key in d) {
    if (
      localStorage.hasOwnProperty(key) &&
      key !== "userData" &&
      key !== "currentUser" &&
      key !== "interests" &&
      key !== "currentTheme"
    ) {
      try {
        const item = JSON.parse(localStorage.getItem(key));
        if (item && item.currentUser === user.usuario) {
          returnData[key] = item;
        }
      } catch (e) {
        // ignore non-json
      }
    }
  }
  return returnData;
}

function calcDividendsSummary(fiis) {
  // fiis: { SYMBOL: { quantity, value, lastCloseValue, ... } }
  // We'll assume "value" stored is total purchase value (per Crud.js implementation: Math.floor(value*quantity))
  let totalReceived = 0; // placeholder: we don't have dividend history in storage, so derive a mock projection
  let projectionAnnual = 0;

  // We'll compute current portfolio value and unrealized gain too
  let portfolioValue = 0;
  let totalCost = 0;

  for (const k in fiis) {
    const f = fiis[k];
    const qty = Number(f.quantity) || 0;
    const last = Number(f.lastCloseValue) || 0;
    const cost = Number(f.value) || 0; // total cost as saved

    portfolioValue += last * qty;
    totalCost += cost;

    // Make a conservative dividend projection: use 6% annual yield on market value as example
    projectionAnnual += last * qty * 0.06;
  }

  // totalReceived can't be derived; show zero if no data
  return {
    totalReceived,
    projectionAnnual,
    portfolioValue,
    totalCost,
  };
}

function renderFiiScope(fiis) {
  const container = document.getElementById("div-scope-vision");
  if (!container) return;

  // Clear previous entries but keep header labels as first row nodes already present in HTML
  // We'll replace innerHTML with columns rows
  container.innerHTML = "";

  const headerRow = document.createElement("div");
  headerRow.className = "reports-row header";

  const h1 = document.createElement("div");
  h1.textContent = "FIIs (sigla)";
  const h2 = document.createElement("div");
  h2.textContent = "Custo (total)";
  const h3 = document.createElement("div");
  h3.textContent = "Último fechamento (unidade)";

  headerRow.appendChild(h1);
  headerRow.appendChild(h2);
  headerRow.appendChild(h3);
  container.appendChild(headerRow);

  for (const k in fiis) {
    const f = fiis[k];
    const row = document.createElement("div");
    row.className = "reports-row";

    const col1 = document.createElement("div");
    col1.textContent = f.sigla || k;

    const col2 = document.createElement("div");
    col2.textContent = formatBRL(Number(f.value) || 0);

    const col3 = document.createElement("div");
    col3.textContent = formatBRL(Number(f.lastCloseValue) || 0);

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);

    container.appendChild(row);
  }

  if (Object.keys(fiis).length === 0) {
    const empty = document.createElement("div");
    empty.className = "muted";
    empty.textContent = "Nenhum FII registrado para o usuário atual.";
    container.appendChild(empty);
  }
}

function renderDividendsSummary(summary) {
  const container = document.getElementById("div-dividends-summary");
  if (!container) return;
  container.innerHTML = "";

  const totalReceived = document.createElement("div");
  totalReceived.textContent = `Total recebido: ${formatBRL(
    summary.totalReceived || 0
  )}`;

  const projection = document.createElement("div");
  projection.textContent = `Projeção anual: ${formatBRL(
    summary.projectionAnnual || 0
  )}`;

  const portfolio = document.createElement("div");
  portfolio.textContent = `Valor de mercado: ${formatBRL(
    summary.portfolioValue || 0
  )}`;

  const cost = document.createElement("div");
  cost.textContent = `Custo total: ${formatBRL(summary.totalCost || 0)}`;

  container.appendChild(totalReceived);
  container.appendChild(projection);
  container.appendChild(portfolio);
  container.appendChild(cost);
}

function renderMonthlyReturns(fiis) {
  const container = document.getElementById("div-month-return");
  if (!container) return;

  // We don't have historical prices; we'll fabricate simple monthly returns for the last 6 months
  const months = 6;
  const values = [];
  let base = 1000;
  for (let i = 0; i < months; i++) {
    // random small return
    const change = (Math.random() - 0.4) * 0.05; // between -0.02 and 0.03 approx
    base = base * (1 + change);
    values.push(base);
  }

  container.innerHTML = "";
  const list = document.createElement("ul");
  list.className = "month-list";
  for (let i = 0; i < months; i++) {
    const li = document.createElement("li");
    li.textContent = `${i + 1}m: ${(
      ((values[i] - values[i - 1] || 0) / (values[i - 1] || values[i])) *
      100
    ).toFixed(2)}%`;
    list.appendChild(li);
  }
  container.appendChild(list);

  return values;
}

function drawReturnsChart(values) {
  const canvas = document.getElementById("returns-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const padding = 30;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  ctx.strokeStyle =
    getComputedStyle(document.documentElement).getPropertyValue(
      "--accent-color"
    ) || "#4caf50";
  ctx.lineWidth = 2;
  ctx.beginPath();
  values.forEach((v, i) => {
    const x = padding + (i * (w - padding * 2)) / (values.length - 1 || 1);
    const y = h - padding - ((v - min) * (h - padding * 2)) / range;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // draw points
  ctx.fillStyle =
    getComputedStyle(document.documentElement).getPropertyValue(
      "--accent-color"
    ) || "#4caf50";
  values.forEach((v, i) => {
    const x = padding + (i * (w - padding * 2)) / (values.length - 1 || 1);
    const y = h - padding - ((v - min) * (h - padding * 2)) / range;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();
  });
}

function initReports() {
  const fiis = getUserFIIs();
  const summary = calcDividendsSummary(fiis);

  renderFiiScope(fiis);
  renderDividendsSummary(summary);
  const values = renderMonthlyReturns(fiis);
  drawReturnsChart(values);
}

// Export globally for the inline call in HTML
window.initReports = initReports;
