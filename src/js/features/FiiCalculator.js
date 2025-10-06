
let calculatorCount = 0;
const calculations = {};

function calc() 
{

    const item_value = document.getElementById(`preco-ativo-0`).value;

    const qtd_items = document.getElementById(`qtd-cotas-0`).value;

    const dividend_value = document.getElementById(`valor-dividendo-0`).value;

    const aplication_time = document.getElementById(`tempo-aplicacao-0`).value;


    const final_item_value = item_value * qtd_items; // valor acumulado final dos ativos
    const total_dividend_per_month = dividend_value * qtd_items; // valor total de dividendos recebidos por mes
    const final_dividend_received = total_dividend_per_month * aplication_time; // valor total de dividendos recebidos no periodo
    const final_patrimony = final_item_value + final_dividend_received; // valor total do patrimonio no fim do periodo

    calculations[0] = {
        final_item_value,
        total_dividend_per_month,
        final_dividend_received,
        final_patrimony,
        aplication_time
    };
    
    generateFinalReport();
}

const generateFinalReport = () => {
    let totalPatrimony = 0;
    let totalDividends = 0;
    let totalInvestment = 0;
    let ap_time = calculations[0].aplication_time

    totalDividends = calculations[0].final_dividend_received
    totalDividends = calculations[0].final_patrimony
    totalInvestment = calculations[0].final_item_value

    const reportDiv = document.getElementById('final-report');
    reportDiv.innerHTML = `
        <h3>Relatório Final</h3> <br/>

        <p>Investimento Aplicado Total: <br/>  <strong>R$ ${totalInvestment.toFixed(2)}</strong></p>
        
        <p>Total de Dividendos Recebidos: <br/>  <strong>R$ ${totalDividends.toFixed(2)}</strong></p>
        <br/>
        <p>Patrimônio Total ao Fim de ${ap_time} meses: <br/>  <strong>R$ ${totalPatrimony.toFixed(2)}</strong></p>
    `;
}

function limparCampos()
{
    let inputs = document.getElementsByClassName('calc-input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}


