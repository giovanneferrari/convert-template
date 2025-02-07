let inputAmount = document.querySelector("input")
let convertBtn = document.querySelector("button")

const dollarConvert = document.querySelector('option[value="USD"]')
const euroConvert = document.querySelector('option[value="EUR"]')
const poundConvert = document.querySelector('option[value="GBP"]')

let selectChange = document.querySelector('select')
const footerEl = document.querySelector('footer')
let descriptionEl = document.querySelector('#description')
let resultEl = document.querySelector('#result')
const formEl = document.querySelector('form')
const disclaimerEl = document.querySelector('#disclaimer')
const dateEl = document.querySelector('#date')

let euroPrice = 5.95
let poundPrice = 7.1

async function getDollarRate() {
    const response = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='02-06-2025'&$top=1&$format=json&$select=cotacaoVenda`);
    const data = await response.json();
    console.log(data)
    let dollarRate = data.value[0].cotacaoVenda.toFixed(2)
    return dollarRate
}

async function getEuroRate() {
    const response = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='EUR'&@dataCotacao='02-06-2025'&$top=1&$format=json&$select=cotacaoVenda`);
    const data = await response.json();
    console.log(data)
    let euroRate = data.value[0].cotacaoVenda.toFixed(2)
    return euroRate
}

async function getPoundRate() {
    const response = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='GBP'&@dataCotacao='02-06-2025'&$top=1&$format=json&$select=cotacaoVenda`);
    const data = await response.json();
    console.log(data)
    let poundRate = data.value[0].cotacaoVenda.toFixed(2)
    return poundRate
}

async function dollarResult() {
    const dollarPrice = await getDollarRate()
    return dollarPrice
}

async function euroResult() {
    const euroPrice = await getEuroRate()
    return euroPrice
}

async function poundResult() {
    const poundPrice = await getPoundRate()
    return poundPrice
}

/** Função responsável por barrar a entrada de texto no input */
inputAmount.addEventListener('input', () => {
    const hasCharactersRegex = /\D+/g
    inputAmount.value = inputAmount.value.replace(hasCharactersRegex, '');
})

/** Função responsável por verificar qual moeda foi selecionada */
formEl.addEventListener('submit', (event) => {
    event.preventDefault()

    switch (selectChange.value) {
        case "USD":
            convertCurrency(amount.value, dollarResult(), "US$")
            break
        case "EUR":
            convertCurrency(amount.value, euroResult(), "€")
            break
        case "GBP":
            convertCurrency(amount.value, poundPrice, "£")
            break
    }
})

/** Função responsável por realizar a conversão */
async function convertCurrency(amount, price, symbol) {
    const dollarPrice = await getDollarRate()
    const euroPrice = await getEuroRate()
    const poundPrice = await getPoundRate()

    if (selectChange.value === "USD") {
    try {
    descriptionEl.textContent = `${symbol} 1 = ${Number(dollarPrice).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} reais`
    let inputResult = amount * dollarPrice
    resultEl.textContent = `${inputResult.toLocaleString('pt-BR', {currency: 'BRL'})} reais`
    dateEl.textContent = dateYesterday()
    disclaimerEl.textContent = `Fonte: Banco Central do Brasil.`

    footerEl.style.display = "block"
    
    } catch (error) {
        console.log(error)
        footerEl.style.display = 'none'
        alert('Não foi possível converter, favor tentar novamente mais tarde.')
    }
    } else if (selectChange.value === "EUR") {
        try {
            descriptionEl.textContent = `${symbol} 1 = ${Number(euroPrice).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} reais`
            let inputResult = amount * euroPrice
            resultEl.textContent = `${inputResult.toLocaleString('pt-BR', {currency: 'BRL'})} reais`
            dateEl.textContent = dateYesterday()
            disclaimerEl.textContent = `Fonte: Banco Central do Brasil.`
        
            footerEl.style.display = "block"
            
            } catch (error) {
                console.log(error)
                footerEl.style.display = 'none'
                alert('Não foi possível converter, favor tentar novamente mais tarde.')
            }
    } else if (selectChange.value === "GBP") {
        try {
            descriptionEl.textContent = `${symbol} 1 = ${Number(poundPrice).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} reais`
            let inputResult = amount * poundPrice
            resultEl.textContent = `${inputResult.toLocaleString('pt-BR', {currency: 'BRL'})} reais`
            dateEl.textContent = dateYesterday()
            disclaimerEl.textContent = `Fonte: Banco Central do Brasil.`
        
            footerEl.style.display = "block"
            
            } catch (error) {
                console.log(error)
                footerEl.style.display = 'none'
                alert('Não foi possível converter, favor tentar novamente mais tarde.')
            }
    }
}

function dateYesterday() {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0') - 1
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()
    return `Cotação do dia: ${day}/${month}/${year}`
}

/** Função responsável por verificar qual moeda foi selecionada e realizar a conversão */
// formEl.addEventListener("submit", (event) => {
//     event.preventDefault()
//     if (inputAmount.value === "") {
//         window.alert("Favor digitar um valor")
//     } else {
//         if (selectChange.value === "USD") {
//             let inputResult = inputAmount.value * dollarPrice
//             footerEl.style.display = "block"
//             descriptionEl.textContent = `U$ 1 = ${dollarPrice.toLocaleString('pt-BR',
//                     {style: 'currency',
//                     currency: 'BRL'})}`
//             resultEl.textContent = `${inputResult.toLocaleString('pt-BR',
//                 {currency: 'BRL'})} reais`
//         } else if (selectChange.value === "EUR") {
//             let inputResult = inputAmount.value * euroPrice
//             footerEl.style.display = "block"
//             descriptionEl.textContent = `€ 1 = ${euroPrice.toLocaleString('pt-BR',
//                 {style: 'currency',
//                 currency: 'BRL'})}`
//             resultEl.textContent = `${inputResult.toLocaleString('pt-BR',
//             {currency: 'BRL'})} reais`
//         } else if (selectChange.value === "GBP") {
//             let inputResult = inputAmount.value * poundPrice
//             footerEl.style.display = "block"
//             descriptionEl.textContent = `£ 1 = ${poundPrice.toLocaleString('pt-BR',
//                 {style: 'currency',
//                 currency: 'BRL'})}`
//             resultEl.textContent = `${inputResult.toLocaleString('pt-BR',
//             {currency: 'BRL'})} reais`
//         }
//     }
// })