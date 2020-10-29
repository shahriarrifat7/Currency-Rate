
// fetch input fields
var UIController = (function ()  {
    return {
        getInput : function() {
            return {
                firstCurrency: document.getElementById('currency-one'),
                firstAmount: document.getElementById('amount-one'),
                secondCurrency: document.getElementById('currency-two'),
                secondAmount: document.getElementById('amount-two'),
                rateElement: document.getElementById('rate'),
                exchange: document.getElementById('swap')
            };
        }
    };
})();

var input = UIController.getInput();

// Fetch exchange rates and update the DOM
function solve() {

  fetch(`https://api.exchangerate-api.com/v4/latest/${input.firstCurrency.value}`)
    .then(res => res.json())
    .then(data => {
      
      var rate = data.rates[input.secondCurrency.value];

      input.rateElement.innerText = `1 ${input.firstCurrency.value} = ${rate} ${input.secondCurrency.value}`;

      input.secondAmount.value = (input.firstAmount.value * rate).toFixed(4);
    });
}

// Event listeners
input.firstCurrency.addEventListener('change', solve);
input.firstAmount.addEventListener('input', solve);
input.secondCurrency.addEventListener('change', solve);
input.secondAmount.addEventListener('input', solve);

//Swap between currencies
input.exchange.addEventListener('click', () => {
  var temp = input.firstCurrency.value;
  input.firstCurrency.value = input.secondCurrency.value;
  input.secondCurrency.value = temp;
  solve();
});

solve();
