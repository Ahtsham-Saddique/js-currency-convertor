import { countryList } from "./code.js";
const dropdown=document.querySelectorAll(".dropdown select")


for (let select of dropdown)
{
for (let curcode in countryList)
    {   
         let newOption=document.createElement("option");
        newOption.innerText=curcode;
         newOption.value=curcode;
         select.append(newOption);

    }}