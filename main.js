//VARIÁVEIS DE TODAS AS INFORMAÇÕES DOS PAÍSES
let bandeira = [];
let nome = [];
let populacao = [];
let continente = [];
let subContinente = [];
let capital = [];
let tld = [];
let moeda = [];
let lingua = [];

//VARIÁVEIS DOS ELEMENTOS HTML
const sectionPaises = document.querySelector(".container__paises");
const sectionCards = document.querySelector(".container__cards");
const pesquisa = document.querySelector(".pesquisa");
const filtro = document.querySelector("#filtro");

//FUNÇÃO QUE INSERE AS INFORMAÇÕES DE CADA PAÍS EM SEU RESPECTIVO ARRAY
informacoesPaises();
async function informacoesPaises() {
  //RECEBE E CONVERTE OS DADOS DA API DOS PAÍSES
  const tp = await fetch("https://restcountries.com/v3.1/all");
  const todosPaises = await tp.json();

  //SOBE AS INFORMAÇÕES DOS PAÍSES EM SEUS RESPECTIVOS ARRAYS
  todosPaises.forEach((pais) => {
    bandeira.push(pais.flags.svg);
    nome.push(pais.name.common);
    populacao.push(pais.population);
    continente.push(pais.continents);
    subContinente.push(pais.subregion);
    if (pais.capital) {
      capital.push(pais.capital[0]);
    }
    if (pais.tld) {
      tld.push(pais.tld[0]);
    }

    let nomeMoeda = pais.currencies;
    if (nomeMoeda) {
      const nomeMoeda1 = Object.keys(nomeMoeda)[0];
      moeda.push(nomeMoeda[nomeMoeda1].name);
    }
    let nomeLingua = pais.languages;
    if (nomeLingua) {
      const nomeLingua1 = Object.keys(nomeLingua)[0];
      lingua.push(nomeLingua[nomeLingua1]);
    }
  });

  //CHAMA A FUNÇÃO QUE IMPRIME OS PAÍSES NA TELA
  inserirPaisesTela(todosPaises);
}

//FUNÇÃO QUE INSERE OS PAÍSES NA TELA E CHAMA A FUNÇÃO DOS CARDS
function inserirPaisesTela(todosPaises) {
  let i = 0;

  todosPaises.forEach(() => {
    sectionPaises.innerHTML += `<div class="container__pais" id=${i}>
                <label class="pais-label">
                  <input type="button" class="pais-btn">
                  <img src="${bandeira[i]}" alt="Bandeira do País">
                  <div class="container__info-pais">
                    <h2 class="nome-pais">
                      ${nome[i]}
                    </h2>
                    <p class="paragrafo-pais populacao">
                      <strong>População:</strong> ${populacao[i]}
                    </p>
                    <p class="paragrafo-pais continente">
                      <strong>Continente:</strong> ${continente[i]}
                    </p>
                    <p class="paragrafo-pais capital">
                      <strong>Capital:</strong> ${capital[i]}
                    </p>
                  </div>
                </label>
              </div>`;
    i += 1;
  });

  let botaoCard = document.querySelectorAll(".pais-btn");
  abreCards(botaoCard);
}

//FUNÇÃO DO INPUT DE PESQUISA
pesquisa.addEventListener("click", iniciarPesquisa);
function iniciarPesquisa() {
  let listaNomes = document.querySelectorAll(".nome-pais");

  pesquisa.addEventListener("input", visibilidadePais);

  function visibilidadePais() {
    let textoPesquisaFormatado = pesquisa.value.toLowerCase();

    listaNomes.forEach((nome) => {
      let containerPais = nome.closest(".container__pais");
      let nomeFormatado = nome.innerText.toLowerCase();
      if (nomeFormatado.includes(textoPesquisaFormatado)) {
        containerPais.classList.remove("hidden");
      } else {
        containerPais.classList.add("hidden");
      }
    });
  }
}

// FUNÇÃO DO SELECT DO FILTRO
filtro.addEventListener("click", filtroRegioes);
function filtroRegioes() {
  filtro.addEventListener("change", () => {
    const continenteFiltro = filtro.value;
    let listaContinentes = document.querySelectorAll(".continente");

    listaContinentes.forEach((continentePais) => {
      let containerPais = continentePais.closest(".container__pais");
      let continenteFormatado = continentePais.innerText
        .replace("Continente:", "")
        .replace("South", "")
        .replace("North", "")
        .trim();

      if (
        continenteFiltro == continenteFormatado &&
        continenteFiltro != "Todos"
      ) {
        containerPais.classList.remove("hiddenFiltro");
      } else if (continenteFiltro != "Todos") {
        containerPais.classList.add("hiddenFiltro");
      } else {
        containerPais.classList.remove("hiddenFiltro");
      }
    });
  });
}

//FUNÇÃO QUE ABRE O CARD DE INFORMAÇÕES
function abreCards(botaoCard) {
  botaoCard.forEach((botao) => {
    botao.addEventListener("click", () => {
      let i = botao.closest(".container__pais").id;

      sectionPaises.classList.add("hidden");
      pesquisa.classList.add("hidden");
      filtro.classList.add("hidden");

      sectionCards.innerHTML = `
        <div class="container__card">
          <input type="button" class="voltar-btn" value='&larr; Voltar'>
          
          <img src="${bandeira[i]}" alt="Bandeira do País">
          
          <div class="container__info-card">
            <h2 class="nome-pais">
              ${nome[i]}
            </h2>
            <p class="paragrafo-card populacao">
              <strong>População:</strong> ${populacao[i]}
            </p>
            <p class="paragrafo-card continente">
              <strong>Continente:</strong> ${continente[i]}
            </p>
            <p class="paragrafo-card subContinente">
              <strong>Sub-Continente:</strong> ${subContinente[i]}
            </p>
            <p class="paragrafo-card capital">
              <strong>Capital:</strong> ${capital[i]}
            </p>
          </div>
          
          <div class="container__info-card-2">
            <p class="paragrafo-card tld">
              <strong>TLD:</strong> ${tld[i]}
            </p>
            <p class="paragrafo-card moeda">
              <strong>Moeda:</strong> ${moeda[i]}
            </p>
            <p class="paragrafo-card lingua">
              <strong>Língua:</strong> ${lingua[i]}
            </p>
          </div>`;

      const botaoVoltar = document.querySelector(".voltar-btn");
      voltar(botaoVoltar);
    });
  });

  //FUNÇÃO DO BOTÃO VOLTAR
  function voltar(botaoVoltar) {
    botaoVoltar.addEventListener("click", () => {
      sectionPaises.classList.remove("hidden");
      pesquisa.classList.remove("hidden");
      filtro.classList.remove("hidden");

      sectionCards.innerHTML = "";
    });
  }
}
