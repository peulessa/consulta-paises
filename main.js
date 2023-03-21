let botaoDark = document.querySelector('.dark-mode-input')
botaoDark.addEventListener('click', ()=>{
    console.log('Clicou')
})

async function buscaPaises(){
    let p = await fetch('https://restcountries.com/v3.1/all')
    let paises = await p.json()
    console.log(paises[0])
}
buscaPaises()
