let inputAmount = document.querySelector("input")
let convertBtn = document.querySelector("button")
const dollarConvert = document.querySelector('option[value="USD"]')
const euroConvert = document.querySelector('option[value="EUR"]')
const poundConvert = document.querySelector('option[value="GBP"]')
let selectExchange = document.querySelector('option[selected]')
let selectChange = document.querySelector('select')
const footerEl = document.querySelector('footer')
let descriptionEl = document.querySelector('#description')
let resultEl = document.querySelector('#result')

let dollarPrice = 4.86
let euroPrice = 4.92
let poundPrice = 4.83

convertBtn.addEventListener("click", (event) => {
    event.preventDefault()
    if (inputAmount.value === "") {
        window.alert("Favor digitar um valor")
    } else {
        if (selectChange.value === "USD") {
            let inputResult = inputAmount.value * dollarPrice
            footerEl.style.display = "block"
            descriptionEl.textContent = `U$ 1 = ${dollarPrice.toLocaleString('pt-BR',
                    {style: 'currency',
                    currency: 'BRL'})}`
            resultEl.textContent = `${inputResult.toLocaleString('pt-BR',
                {currency: 'BRL'})} reais`
        } else if (selectChange.value === "EUR") {
            let inputResult = inputAmount.value * euroPrice
            footerEl.style.display = "block"
            descriptionEl.textContent = `€ 1 = ${euroPrice.toLocaleString('pt-BR',
                {style: 'currency',
                currency: 'BRL'})}`
            resultEl.textContent = `${inputResult.toLocaleString('pt-BR',
            {currency: 'BRL'})} reais`
        } else if (selectChange.value === "GBP") {
            let inputResult = inputAmount.value * poundPrice
            footerEl.style.display = "block"
            descriptionEl.textContent = `£ 1 = ${poundPrice.toLocaleString('pt-BR',
                {style: 'currency',
                currency: 'BRL'})}`
            resultEl.textContent = `${inputResult.toLocaleString('pt-BR',
            {currency: 'BRL'})} reais`
        }
    }
})