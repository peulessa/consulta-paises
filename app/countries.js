import { infoCountries } from "./init.js";
import { paginatioDades } from "./init.js";
import { updatepagination } from "./pagination.js";
import { search } from "./search.js";
const info = await infoCountries();
const dades = await paginatioDades();

//FUNÇÃO QUE INSERE OS PRIMEIROS PAÍSES NA TELA
export async function insertFirstCountries() {
  const countriesList = document.querySelector(".countries-list");
  const firstCountriesInDisplay = info.slice(0, dades.itemsPerPage);

  firstCountriesInDisplay.forEach((country) => {
    const initCountry = document.createElement("li");
    initCountry.classList.add("country");
    initCountry.id = `${country.name}`;
    initCountry.innerHTML = `<label class="country-label">
            <input type="button" class="country-btn">
            <div class = country-img>
                <img src="${country.flag}" alt="Bandeira do País">
            </div>
            <div class="container__info-country">
                <h2 class="name-country">
                ${country.name}
                </h2>
                <p class="p-country">
                <strong>População:</strong> ${country.population}
                </p>
                <p class="p-country">
                <strong>Continente:</strong> ${country.continent}
                </p>
                <p class="p-country">
                <strong>Capital:</strong> ${country.capital}
                </p>
            </div>
            </label>`;
    countriesList.appendChild(initCountry);
  });

  //CHAMA A FUNÇÃO DE PESQUISA
  search();
}

//FUNÇÃO QUE IDENTIFICA O PAÍS CLICADO E CHAMA A FUNÇÃO QUE CRIA SEU CARD DE INFORMAÇÕES
export function identifyCard() {
  const countriesDisplayBtn = document.querySelectorAll(".country-btn");

  countriesDisplayBtn.forEach((button) => {
    button.addEventListener("click", () => {
      const clickedCountry = button.closest(".country").id;
      createCard(clickedCountry);
    });
  });
}

//FUNÇÃO QUE CRIA O CARD ESPECIFICADO
function createCard(clickedCountry) {
  const html = {
    search: document.querySelector(".search"),
    filter: document.querySelector(".filter"),
    pagination: document.querySelectorAll(".pagination-btn"),
    countries: document.querySelectorAll(".country"),
    countriesList: document.querySelector(".countries-list"),
  };

  //ESCONDE TODOS OS ELEMENTOS DA TELA, DEIXANDO SOMENTE O CARD VISÍVEL
  html.countries.forEach((country) => {
    country.classList.add("hidden");
  });
  html.pagination.forEach((paginationBtn) => {
    paginationBtn.classList.add("hidden");
  });
  html.filter.classList.add("hidden");
  html.search.classList.add("hidden");

  //CRIA O CARD NA TELA
  info.forEach((info) => {
    if (info.name == clickedCountry) {
      const card = document.createElement("li");
      card.classList.add("card");
      card.innerHTML += `
            <input type="button" id="back-card-btn" value="&larr; Voltar">
            <div class = card-img>
                <img src="${info.flag}" alt="Bandeira do País">
            </div>
            
            <div class="container__info-card">
                <h2 class="name-card">
                ${info.name}
                </h2>
                <p class="p-card">
                <strong>Nome Nativo:</strong> ${info.nativeName}
                </p>
                <p class="p-card">
                <strong>População:</strong> ${info.population}
                </p>
                <p class="p-card">
                <strong>Continente:</strong> ${info.continent}
                </p>
                <p class="p-card">
                <strong>Sub-Continente:</strong> ${info.subRegion}
                </p>
                <p class="p-card">
                <strong>Capital:</strong> ${info.capital}
                </p>
            </div>
            
            <div class="container__info-card
                <p class="p-card">
                <strong>Domínio de Topo:</strong> ${info.tld}
                </p>
                <p class="p-card">
                <strong>Moeda:</strong> ${info.currency}
                </p>
                <p class="p-card">
                <strong>Língua:</strong> ${info.languages}
                </p>
            </div>`;

      html.countriesList.appendChild(card);
    }
  });

  //CHAMA A FUNÇÃO DO BOTÃO DE VOLTAR
  const button = document.querySelector("#back-card-btn");
  backButton(button);
}

//FUNÇÃO DO BOTÃO DE VOLTAR
function backButton(button) {
  button.addEventListener("click", () => {
    const html = {
      search: document.querySelector(".search"),
      filter: document.querySelector(".filter"),
      pagination: document.querySelectorAll(".pagination-btn"),
      countries: document.querySelectorAll(".country"),
      countriesList: document.querySelector(".countries-list"),
      card: document.querySelector(".card"),
    };

    //MOSTRA TODOS OS ELEMENTOS DA TELA
    html.countries.forEach((country) => {
      country.classList.remove("hidden");
    });
    html.pagination.forEach((paginationBtn) => {
      paginationBtn.classList.remove("hidden");
    });
    html.filter.classList.remove("hidden");
    html.search.classList.remove("hidden");

    //DA UPDATE NAS FUNÇÕES DE PAGINAÇÃO
    updatepagination()

    //EXCLUI O CARD
    html.card.remove();
  });
}

//-----------------------------------------------------------------------------------------------------------------------------//

//FUNÇÃO DE UPDATE DOS PAÍSES
export function updateCountries(statePage) {
  let page = statePage - 1;
  let start = page * dades.itemsPerPage;
  let end = start + dades.itemsPerPage;
  const darkMode = document.querySelector(".dark-mode-input");
  const active = darkMode.checked;
  const countriesList = document.querySelector(".countries-list");

  //REMOVE OS PAÍSES ANTIGOS
  const oldCountries = document.querySelectorAll(".country");
  oldCountries.forEach((country) => {
    country.remove();
  });

  //INSERE OS PAÍSES NOVOS
  const infoPaginated = info.slice(start, end);
  infoPaginated.forEach((country) => {
    const paginatedCountry = document.createElement("li");
    paginatedCountry.classList.add("country");
    paginatedCountry.id = `${country.name}`;
    paginatedCountry.innerHTML = `<label class="country-label">
            <input type="button" class="country-btn">
            <div class = country-img>
                <img src="${country.flag}" alt="Bandeira do País">
            </div>
            <div class="container__info-country">
                <h2 class="name-country">
                ${country.name}
                </h2>
                <p class="p-country">
                <strong>População:</strong> ${country.population}
                </p>
                <p class="p-country">
                <strong>Continente:</strong> ${country.continent}
                </p>
                <p class="p-country">
                <strong>Capital:</strong> ${country.capital}
                </p>
            </div>
            </label>`;
    countriesList.appendChild(paginatedCountry);
  });

  //CHAMA A FUNÇÃO QUE IDENTIFICA O CARD A SER CRIADO
  identifyCard();

  // //CHAMA A FUNÇÃO DE PESQUISA
  search();
}
