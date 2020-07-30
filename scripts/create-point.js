function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then ( states => {
        
        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true 

    fetch(url)
    .then( res => res.json())
    .then ( cities => {
        
        
        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false 

    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

    //PESSOAS CADASTRADAS//

const pessoasCad = document.querySelectorAll(".items-grid li")
for(const item of pessoasCad){
    item.addEventListener("click", handleSelectedItem)
}
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados, se sim pegar os itens

    const alreadySelected = selectedItems.findIndex(item => { 
        const itemFound = item == itemId //True or False
        return itemFound
    })
    //se ja estiver, tirar da seleção
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return false
        })
        selectedItems = filteredItems
    } else {
         //se nao estiver, selecionar
         selectedItems.push(itemId)
    }
    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
    
} 