import { createCard } from "./countries.js";
export function listenerSearch(fetchCountries, fetchPagination) {
  const html = {
    input: document.querySelector(".search"),
    countiresInDisplay: document.querySelectorAll(".country"),
    countriesList: document.querySelector(".countries-list"),
  };

  let searchedCountriesList = [];
  const searchText = html.input.value.toLowerCase();

  //COMPARA A LISTA DE PAÍSES COM O INPUT
  fetchCountries.forEach((element) => {
    const country = element.name.toLowerCase();

    //ESCONDE OS PAÍSES NA TELA PARA EXIBIR SOMENTE O PESQUISADO
    if (country.includes(searchText) && searchText.length > 3) {
      html.countiresInDisplay.forEach((element) => {
        element.classList.add("hidden");
      });

      //IMPEDE QUE O PAÍS PESQUISADO APAREÇA MAIS DE UMA VEZ
      if (searchedCountriesList.includes(element.name)) {
        return;
      }
      searchedCountriesList.push(element.name);

      //CRIA E INSERE O PAÍS PESQUISADO
      const searchCountry = document.createElement("li");
      searchCountry.classList.add("country");
      searchCountry.classList.add("searched");
      searchCountry.id = `${element.name}`;
      searchCountry.innerHTML = `<label class="country-label">
            <input type="button" class="country-btn search-btn">
            <div class = country-img>
                <img src="${element.flag}" alt="Bandeira do País">
            </div>
            <div class="container__info-country">
                <h2 class="name-country">
                ${element.name}
                </h2>
                <p class="p-country">
                <strong>População:</strong> ${element.population}
                </p>
                <p class="p-country">
                <strong>Continente:</strong> ${element.continent}
                </p>
                <p class="p-country">
                <strong>Capital:</strong> ${element.capital}
                </p>
            </div>
            </label>`;
      html.countriesList.appendChild(searchCountry);

      const searchBtn = document.querySelector(".search-btn");
      createSearchedCard(element, searchBtn);

      let searched = document.querySelectorAll(".searched");
      if (searched.length > 1) {
        searched = searched[0];
      }
    }
  });

  //CRIA O CARD DO PAÍS PESQUISADO
  function createSearchedCard(info, button){
    button.addEventListener("click", () =>{
      const clickedCountry = info.name
      createCard(clickedCountry, fetchCountries, fetchPagination)
    })
  }

  //MOSTRA NOVAMENTE OS PAÍSES NA TELA E EXCLUI OS JÁ PESQUISADOS
  if (searchText.length == 0) {
    html.countiresInDisplay.forEach((element) => {
      element.classList.remove("hidden");
    });

    //EXCLUI OS PAÍSES JÁ PESQUISADOS
    const insertedSearchedCountries = document.querySelectorAll(".searched");
    insertedSearchedCountries.forEach((element) => {
      element.remove();
    });

    searchedCountriesList = [];
  }

  const darkMode = document.querySelector(".dark-mode-input");
  const searchCountry = document.querySelector(".searched");
  checkSearchDarkMode(searchCountry, darkMode);
}

function checkSearchDarkMode(searchCountry, darkMode) {
  if (searchCountry && darkMode.checked) {
    searchCountry.classList.add("darkElements");
  }
}
