
function listItensSaved()
{
    const fiiContainer = document.getElementById("fii-list-container");
    fiiContainer.innerHTML = ''; // Clear the list before adding new items
    
    let d = {...localStorage}
    
    for(const item in d)
    {
        if (
            localStorage.hasOwnProperty(item) 
            && item != "userData"
            && item != "currentUser"    
            && item != "interests"    
    ) 
        {
            const itemData = JSON.parse(localStorage.getItem(item));
            const newElement = fiiCreateElement(itemData);

            fiiContainer.appendChild(newElement);
        }
    }
}

const fiiCreateElement = (itemData) => {
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
    
    const quantitySpan = document.createElement('span');
    quantitySpan.id = 'fii-quantity';
    quantitySpan.textContent = `${itemData.quantity}`;

    const gainSpan = document.createElement('span');
    gainSpan.id = 'fii-gain';
    gainSpan.textContent = '0.0 R$'; // Placeholder for gain

    investmentDiv.appendChild(siglaNameContainer);
    investmentDiv.appendChild(valueSpan);
    investmentDiv.appendChild(quantitySpan);
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

function listInterests()
{
    const interestsContainer = document.querySelector("#interest-investiments .interests-container");
    interestsContainer.innerHTML = '';

    morePopular = [
        "MXRF11",
        "VGIA11",
        "RZAG11",
        "GARE11",
        "HGLG11"
    ];
    let interests = handleGetInterests();

    handleClearInterests();
    const iterator = new Set();
    for (let index = 0; index < 4; index++) 
    {
        let i = Math.floor(Math.random() * (morePopular.length - 1));

        if(!iterator.has(i))
        {
            iterator.add(i);

            console.log(iterator);
            handleSetInterest(morePopular[i])
        }
        else
        {
            index -= 1;
            continue
        }

    }

    interests = handleGetInterests();
    for (let i in interests)
    {
        const newElement = interestsCreateElement(i);
        interestsContainer.appendChild(newElement);
    }
}

const interestsCreateElement = (sigla) => {
    const interestDiv = document.createElement('div');
    interestDiv.className = 'top-label-investiment';
    interestDiv.textContent = sigla;
    return interestDiv;
}