let botaoDark = document.querySelector('.dark-mode-input')
botaoDark.addEventListener('click', ()=>{
    console.log('Clicou')
})

todoPais()

async function todoPais(){
    let tp = await fetch('https://restcountries.com/v3.1/all')
    let todosPaises = await tp.json()
    
    todosPaises.forEach(element => {
        let nome = element.name.common
        let continente = element.continents[0]
        let capital = element.capital[0]
        let bandeira = element.flags.svg
        let populacao = element.population

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
}


