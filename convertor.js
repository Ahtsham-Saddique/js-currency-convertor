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
