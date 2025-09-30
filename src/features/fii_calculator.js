
let calculatorCount = 0;
const calculations = {};

function calc(index) {
    const item_value = document.getElementById(`preco_ativo-${index}`).value;
    const qtd_items = document.getElementById(`qtd_cotas-${index}`).value;
    const dividend_value = document.getElementById(`valor_dividendo-${index}`).value;
    const aplication_time = document.getElementById(`tempo_aplicacao-${index}`).value;

    const final_item_value = item_value * qtd_items; // valor acumulado final dos ativos
    const total_dividend_per_month = dividend_value * qtd_items; // valor total de dividendos recebidos por mes
    const final_dividend_received = total_dividend_per_month * aplication_time; // valor total de dividendos recebidos no periodo
    const final_patrimony = final_item_value + final_dividend_received; // valor total do patrimonio no fim do periodo

    // Store calculations for this index

    calculations[index] = {
        final_item_value,
        final_dividend_received,
        final_patrimony
    };

    displayResult(index);
}

const displayResult = (index) => {
    const item_report = document.getElementById(`item-report-${calculatorCount}`);


    const total_value = document.getElementById(`valor-total-display-${index}`);
    const dividend_received = document.getElementById(`dividendos-totais-display-${index}`);
    const total_patrimony = document.getElementById(`total-patrimony-display-${index}`);

    total_value.innerText = `\nVaor total dos ativos no fim do periodo: +/- R$ ${calculations[index].final_item_value}`;

    dividend_received.innerText = `\nDividendos recebidos: +/- R$ ${calculations[index].final_dividend_received}`;

    total_patrimony.innerText = `\nValor de patrimonio total: +/- R$ ${calculations[index].final_patrimony}`;
}

const generateFinalReport = () => {
    let totalPatrimony = 0;
    let totalDividends = 0;
    let totalInvestment = 0;

    Object.values(calculations).forEach(calc => {
        totalPatrimony += calc.final_patrimony;
        totalDividends += calc.final_dividend_received;
        totalInvestment += calc.final_item_value;
    });

    const reportDiv = document.getElementById('final-report');
    reportDiv.innerHTML = `
        <h3>Relatório Final</h3>
        <p>Investimento Total: R$ ${totalInvestment.toFixed(2)}</p>
        <p>Total de Dividendos: R$ ${totalDividends.toFixed(2)}</p>
        <p>Patrimônio Total: R$ ${totalPatrimony.toFixed(2)}</p>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addCalculator');
    const calculateAllButton = document.getElementById('calculateAll');
    
    addButton.addEventListener('click', function() {
        calculatorCount++;

        const template = document.getElementById('calculator-container-0');
        const clone = template.cloneNode(true);
        
        clone.id = `calculator-container-${calculatorCount}`;
        
        // substitui o indice de todos os elementos div e span dentro do clone
        clone.querySelectorAll('input, span').forEach(element => {
            if (element.id) {
                element.id = element.id.replace('-0', `-${calculatorCount}`);
            }
        });

        //Adiciona o clone ao corpo do site
        document.getElementById('calculators-wrapper').appendChild(clone);
    });

    calculateAllButton.addEventListener('click', function() {
        for (let i = 0; i <= calculatorCount; i++) {
            calc(i);
        }
        if (calculatorCount >= 1) 
        {
            for (let i = 0; i <= calculatorCount; i++) {
                calc(i);
            }
            generateFinalReport();
        }
    });
});


