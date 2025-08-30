let btn = document.querySelector("#convertBtn");
let fromCurrency = document.querySelector("#fromCurrency");
let toCurrency = document.querySelector("#toCurrency");
let amount = document.querySelector("#amount");
let result = document.querySelector("#result");

 let apiKey = "f13737514b1107b73aeea4af74c3adcc";
 let apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

fetch(apiUrl)
.then(response => response.json())
.then(data => {
    console.log(data.rates);
    
    let currencies = Object.keys(data.rates);
    console.log(currencies);
    currencies.forEach(currency => {
     fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
     toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    })
})
.catch(errors =>{
    //   console.error(`${errors} ocur on load currencies.`  )
    })

btn.addEventListener("click" , function(){
    let from = fromCurrency.value;
    let to = toCurrency.value;
    let amt = parseFloat(amount.value);
 
    if(isNaN(amt)){
       result.textContent = "Enter a correct Amount.";
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)

    .then(response => response.json())
    .then(data => {
        let rates = data.rates[to];
        let converted = amt * rates;

        result.textContent = `${amt} ${from} = ${converted.toFixed(2)} ${to}`;
    })
    .catch(error => {
        console.error(`Error Coverting Currency : ${error}`);
    })
})