

let item_value
let qtd_items 
let dividend_value 
let aplication_time 

let final_item_value;
let final_qtd_items;
let final_dividend_received;
let final_patrimony;


function calc() 
{
    item_value          = document.getElementById("preco_ativo").value
    qtd_items           = document.getElementById("qtd_cotas").value
    dividend_value      = document.getElementById("valor_dividendo").value
    aplication_time     = document.getElementById("tempo_aplicacao").value

    let total_dividend_per_month;

    final_item_value = item_value * qtd_items;
    total_dividend_per_month = dividend_value * qtd_items;

    final_dividend_received = total_dividend_per_month * aplication_time
    final_patrimony = final_item_value + final_dividend_received;
    displayResult();
}
const displayResult = ()=>{
    let display = document.getElementById("calc-display");
    console.log("\nVaor total de ativos: "+final_item_value+"\nDividendos recebidos: "+final_dividend_received+"\n\nValor de patrimonio total: "+final_patrimony);
    
}

