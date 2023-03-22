let botaoDark = document.querySelector('.dark-mode-input')
botaoDark.addEventListener('click', ()=>{
    console.log('Clicou')
})

imprimeTodosPaises()

async function imprimeTodosPaises(){
    let tp = await fetch('https://restcountries.com/v3.1/all')
    let todosPaises = await tp.json()
    
    todosPaises.forEach(element => {
        
        let bandeira = element.flags.svg
        let nome = element.name.common
        let populacao = element.population
        let continente = element.continents
        if(element.capital){
            capital = element.capital[0]
        }
        let subRegiao = element.subregion

        let divPaises = document.querySelector('.container__paises')

        divPaises.innerHTML += 
            `<div class="container__pais">
                <label class="pais-label">
                    <input type="button" class="pais-btn">
                    <img src="${bandeira}" alt="Bandeira do País">
                    <div class="container__info-paises">
                        <h2 class="nome-pais">
                        ${nome}
                        </h2>
                        <p class="paragrafo-pais">
                            <strong>População:</strong> ${populacao}
                        </p>
                        <p class="paragrafo-pais">
                            <strong>Continente:</strong> ${continente}
                        </p>
                        <p class="paragrafo-pais">
                            <strong>Capital:</strong> ${capital}
                        </p>
                    </div>
                </label>
            </div>`
    })
    
    let btnPais = document.querySelectorAll('.pais-btn')
    
    btnPais.forEach(element => {
        element.addEventListener('click', () =>{
            console.log('clicou')
        })
    })
    

}
