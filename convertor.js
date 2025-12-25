import { countryList } from "./code.js";

const amountInput = document.querySelector("#amount");
  const msg = document.querySelector(".msg");
  const form = document.querySelector("form");
  const dropdowns = document.querySelectorAll(".dropdown select");

// Populate dropdowns and flags
  for (let select of dropdowns) {
    for (let curcode in countryList) {
       let newOption = document.createElement("option");
      newOption.innerText = curcode;
         newOption.value = curcode;

    if (curcode === "USD" && select.name === "from") newOption.selected = true;
        if (curcode === "PKR" && select.name === "to") newOption.selected = true;

        select.append(newOption);
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target);
        convertCurrency(); // auto-convert when currency changes
    });
}

const updateFlag = (element) => {
    let curcode = element.value;
    let countrycode = countryList[curcode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countrycode}/shiny/64.png`;
};

const convertCurrency = async () => {
    let amount = amountInput.value || 1; // default 1 if empty
    const fromCurrency = document.querySelector("select[name='from']").value;
    const toCurrency = document.querySelector("select[name='to']").value;

    const URL = `https://open.er-api.com/v6/latest/${fromCurrency}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        msg.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        msg.innerText = "Error fetching exchange rate";
        console.error(error);
    }
};

// Submit form
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    convertCurrency();
});

window.addEventListener("load", () => {
    amountInput.value = 1; 
    convertCurrency();
});
