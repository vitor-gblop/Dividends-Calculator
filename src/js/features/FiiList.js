
function listItensSaved()
{
    const fiiContainer = document.getElementById("fii-list-container");
    fiiContainer.innerHTML = ''; // Clear the list before adding new items
    
    let d = {...localStorage}
    
    for(const item in d)
    {
        if (localStorage.hasOwnProperty(item)) 
        {
            const itemData = JSON.parse(localStorage.getItem(item));
            const newElement = createElement(itemData);

            fiiContainer.appendChild(newElement);
        }
    }
}

const createElement = (itemData) => {
    const investmentDiv = document.createElement('div'); //  cria uma div fii-list-investiment // 

    // define os atributos // 
    investmentDiv.id = 'fii-list-investiment';
    investmentDiv.className = 'display-flex flex-justify-between';

    const siglaNameContainer = document.createElement('div');
    siglaNameContainer.id = 'sigla-name-container';

    const siglaSpan = document.createElement('span');
    siglaSpan.id = 'fii-sigla';
    siglaSpan.textContent = itemData.sigla; 

    const nameSpan = document.createElement('span');
    nameSpan.id = 'fii-name';
    nameSpan.textContent = itemData.shortName;

    siglaNameContainer.appendChild(siglaSpan);
    siglaNameContainer.appendChild(document.createElement('br'));
    siglaNameContainer.appendChild(nameSpan);

    const valueSpan = document.createElement('span');
    valueSpan.id = 'fii-value';
    // valueSpan.textContent = `${itemData.lastCloseValue.toFixed(2)} R$`;
    valueSpan.textContent = `${itemData.value} R$`;

    const gainSpan = document.createElement('span');
    gainSpan.id = 'fii-gain';
    gainSpan.textContent = '0.0 R$'; // Placeholder for gain

    investmentDiv.appendChild(siglaNameContainer);
    investmentDiv.appendChild(valueSpan);
    investmentDiv.appendChild(gainSpan);

    return investmentDiv;
}

const createChoiceOfElements = () => {
    const selectElement = document.getElementById('select-sigla');
    selectElement.innerHTML = ''; // Clear previous options

    let d = {...localStorage}
    
    for (item in d) 
    {
        const itemData = JSON.parse(localStorage.getItem(item));
        console.log(itemData);
        
        
        if (itemData && itemData.sigla) {
            const option = document.createElement('option');
            option.value = itemData.sigla;
            option.textContent = itemData.sigla;

            selectElement.appendChild(option);
        }
    }
}