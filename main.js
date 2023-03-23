imprimeTodosPaises();
async function imprimeTodosPaises() {
  let tp = await fetch("https://restcountries.com/v3.1/all");
  let todosPaises = await tp.json();

  // IMPRIME TODOS OS PAÍSES NA TELA //
  todosPaises.forEach((pais) => {
    let bandeira = pais.flags.svg;
    let nome = pais.name.common;
    let populacao = pais.population;
    let continente = pais.continents;
    if (pais.capital) {
      capital = pais.capital[0];
    }
    let subRegiao = pais.subregion;

    let divPaises = document.querySelector(".container__paises");

    divPaises.innerHTML += `<div class="container__pais">
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
            </div>`;
  });

  // CHAMA A FUNÇÃO DE PESQUISAR OS PAÍSES COM OS NOMES DOS PAÍSES COMO PARÂMETRO //
  let nomePaisTitulo = document.querySelectorAll(".nome-pais");
  pesquisaNomes(nomePaisTitulo)
}

function pesquisaNomes(listaNomes) {
  const inputPesquisa = document.querySelector(".pesquisa");
  const nomePaisesArray = Array.from(listaNomes);
  
  const escondePaises = () => {
    nomePaisesArray.forEach(nomePais => {
      if (!nomePais.innerText.toLowerCase().includes(inputPesquisa.value.toLowerCase())) {
        nomePais.closest(".container__pais").classList.add("hidden");
      } else {
        nomePais.closest(".container__pais").classList.remove("hidden");
      }
    });
  }

  inputPesquisa.addEventListener("input", escondePaises);
}