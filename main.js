imprimeTodosPaises();
async function imprimeTodosPaises() {
  const tp = await fetch("https://restcountries.com/v3.1/all");
  const todosPaises = await tp.json();

  // IMPRIME TODOS OS PAÍSES NA TELA //
  todosPaises.forEach((pais) => {
    let bandeira = pais.flags.svg;
    let nome = pais.name.common;
    let populacao = pais.population;
    let continente = pais.continents;
    if (pais.capital) {
      capital = pais.capital[0];
    }

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
                        <p class="paragrafo-pais continente">
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
  const nomePaisTitulo = document.querySelectorAll(".nome-pais");
  pesquisaNomes(nomePaisTitulo);

  // CHAMA A FUNÇÃO DE FILTRAR OS PAÍSES POR REGIÃO
  const regiaoPais = document.querySelectorAll(".continente");
  filtraRegioes(regiaoPais);
}

// FUNÇÃO DO INPUT DE PESQUISA
function pesquisaNomes(listaNomes) {
  const inputPesquisa = document.querySelector(".pesquisa");
  const nomePaisesArray = Array.from(listaNomes);

  const escondePaises = () => {
    nomePaisesArray.forEach((nomePais) => {
      if (
        !nomePais.innerText
          .toLowerCase()
          .includes(inputPesquisa.value.toLowerCase())
      ) {
        nomePais.closest(".container__pais").classList.add("hidden");
      } else {
        nomePais.closest(".container__pais").classList.remove("hidden");
      }
    });
  };

  inputPesquisa.addEventListener("input", escondePaises);
}

// FUNÇÃO DO SELECT DO FILTRO
function filtraRegioes(listaContinentes) {
  const filtro = document.querySelector("#filtro");

  filtro.addEventListener("change", () => {
    const continenteFiltro = filtro.value;

    listaContinentes.forEach((continentePais) => {
      let continenteFormatado = continentePais.innerText
        .replace("Continente:", "")
        .replace("South", "")
        .replace("North", "")
        .trim();
      let containerPais = continentePais.closest(".container__pais");

      if (
        continenteFiltro == continenteFormatado &&
        continenteFiltro != "Todos"
      ) {
        containerPais.classList.remove("hidden");
      } else if (continenteFiltro != "Todos") {
        containerPais.classList.add("hidden");
      } else {
        containerPais.classList.remove("hidden");
      }
    });
  });
}
