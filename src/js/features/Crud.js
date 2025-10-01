
// {
//     "currency": "BRL",
//     "marketCap": null,
//     "shortName": "FII MAXI RENCI",
//     "longName": "Maxi Renda Fundo De Investimento Imobiliaro - FII",
//     "regularMarketChange": -0.03,
//     "regularMarketChangePercent": -0.306,
//     "regularMarketTime": "2025-09-30T14:31:44.000Z",
//     "regularMarketPrice": 9.77,
//     "regularMarketDayHigh": 9.83,
//     "regularMarketDayRange": "9.76 - 9.83",
//     "regularMarketDayLow": 9.76,
//     "regularMarketVolume": 501339,
//     "regularMarketPreviousClose": 9.8,
//     "regularMarketOpen": 9.82,
//     "fiftyTwoWeekRange": "8.76 - 10.11",
//     "fiftyTwoWeekLow": 8.76,
//     "fiftyTwoWeekHigh": 10.11,
//     "symbol": "MXRF11",
//     "logourl": "https://icons.brapi.dev/icons/BRAPI.svg",
//     "priceEarnings": null,
//     "earningsPerShare": null
// }

async function handleSave()
{
    let sigla = document.getElementById("input-sigla").value;
    let value = document.getElementById("input-value").value;

    sigla = sigla.toUpperCase();

    let data = await handleGetRequisition(sigla);

    let info = {"sigla": data.symbol, "fullName": data.longName, "shortName": data.shortName,"value": value, "lastCloseValue": data.regularMarketPreviousClose}
    console.log(info);
    

    localStorage.setItem(sigla, JSON.stringify(info));
}
function handleSaveUser(user)
{
    let userData = handleGetUserData();
    console.log(userData);
    
    userData[user.usuario] = user;
    console.log(userData);
    

    localStorage.setItem("userData", JSON.stringify(userData));
    return true;
}

function handleDelete()
{
    
}

function handleUpdate()
{
    
}

function handleGetInvestiments()
{

}
function handleGetUserData()
{
    // Get user data from localStorage
    let userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);
    
    if (!userData)
    {
        localStorage.setItem("userData", "{}");
    }

    return userData;
}

async function handleGetRequisition(sigla)
{
    try {
        const response = await fetch(`https://brapi.dev/api/quote/${sigla}?token=${API_TOKEN}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data.results[0]);
        return data.results[0];

    } catch (error) {
        console.error("Error during fetch:", error);
    }
}