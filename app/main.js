//FUNÇÃO QUE CONSOME A API E EXTRAI AS INFORMAÇÕES ÚTEIS
async function infoCountries() {
  const countriesFetch = await fetch("https://restcountries.com/v3.1/all");
  const countriesList = await countriesFetch.json();

  const countriesInfo = await Promise.all(
    countriesList.map(async (country) => {
      let flagInfo = country.flags.svg;
      let nameInfo = country.name.common;
      let nativeNameInfo = null;
      if (country.currencies) {
        let lenguageNativeName = Object.keys(country.name.nativeName)[0];
        nativeNameInfo = country.name.nativeName[lenguageNativeName].common;
      }

      let population = country.population;
      let continent = country.continents[0];
      let subRegion = null;
      country.subregion ? (subRegion = country.subregion) : "";

      let capitalInfo = null;
      country.capital ? (capitalInfo = country.capital[0]) : "";

      let tldInfo = null;
      country.tld ? (tldInfo = country.tld[0]) : "";

      let currencieInfo = null;
      if (country.currencies) {
        let firstCurrencie = Object.keys(country.currencies)[0];
        currencieInfo = country.currencies[firstCurrencie].name;
      }

      let languagesInfo = [];
      if (country.languages) {
        for (let language in country.languages) {
          languagesInfo.push(country.languages[language]);
        }
      }

      let bordersInfo = null;
      country.borders ? (bordersInfo = country.borders) : "";

      const countryInfo = {
        flag: flagInfo,
        name: nameInfo,
        nativeName: nativeNameInfo,
        population: population,
        continent: continent,
        subRegion: subRegion,
        capital: capitalInfo,
        tld: tldInfo,
        currency: currencieInfo,
        languages: languagesInfo,
        borders: bordersInfo,
      };

      return countryInfo;
    })
  );

  init(countriesInfo);
}
infoCountries();

//FUNÇÃO INICIAL
function init(countriesInfo) {
  //FACILITADORES
  const html = {
    get(element) {
      return document.querySelector(element);
    },
    getAll(element) {
      return document.querySelectorAll(element);
    },
  };

  //LISTA DE TODOS OS PAÍSES
  const countriesList = html.get(".countries-list");

  //DADOS DA PAGINAÇÃO
  const totalItems = countriesInfo.length;
  let itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let statePage = 1;

  //CONTROLES DA PAGINAÇÃO
  const controls = {
    next() {
      statePage++;
      statePage > totalPages ? statePage-- : "";
    },
    prev() {
      statePage--;
      statePage < 1 ? statePage++ : "";
    },
    first() {
      statePage = 1;
    },
    last() {
      statePage = totalPages;
    },

    //ESCUTADORES DOS CLICKS NOS BOTÕES DA PAGINAÇÃO
    createListeners() {
      html.get("#next").addEventListener("click", () => {
        controls.next();
        updateCountries();
      });

      html.get("#prev").addEventListener("click", () => {
        controls.prev();
        updateCountries();
      });

      html.get("#first").addEventListener("click", () => {
        controls.first();
        updateCountries();
      });

      html.get("#last").addEventListener("click", () => {
        controls.last();
        updateCountries();
      });
    },
  };
  controls.createListeners();

  //FUNÇÃO QUE INSERE OS PRIMEIROS PAÍSES NA TELA
  function insertCountries() {
    const firstCountries = countriesInfo.slice(0, itemsPerPage);
    const infoCountriesDisplay = [];
    firstCountries.forEach((info) => {
      const infoCountry = {
        borders: info.borders,
        capital: info.capital,
        continent: info.continent,
        currency: info.currency,
        flag: info.flag,
        languages: info.languages,
        name: info.name,
        nativeName: info.nativeName,
        population: info.population,
        subRegion: info.subRegion,
        tld: info.tld,
      };

      infoCountriesDisplay.push(infoCountry);

      countriesList.innerHTML += `<li class="country" id="${infoCountry.name}">
          <label class="country-label">
            <input type="button" class="country-btn">
            <div class = country-img>
              <img src="${infoCountry.flag}" alt="Bandeira do País">
            </div>
            <div class="container__info-country">
              <h2 class="name-country">
                ${infoCountry.name}
              </h2>
              <p class="p-country">
                <strong>População:</strong> ${infoCountry.population}
              </p>
              <p class="p-country">
                <strong>Continente:</strong> ${infoCountry.continent}
              </p>
              <p class="p-country">
                <strong>Capital:</strong> ${infoCountry.capital}
              </p>
            </div>
          </label>
        </li>`;
    });

    //CHAMA A FUNÇÃO QUE IDENTIFICA O CARD A SER CRIADO
    identifyCard(infoCountriesDisplay);
  }
  insertCountries();

  //FUNÇÃO QUE IDENTIFICA O CARD QUE DEVE SER CRIADO E CHAMA A FUNÇÃO DE CRIA-LO
  function identifyCard(infoCountriesDisplay) {
    countriesDisplayBtn = html.getAll(".country-btn");
    countriesDisplayBtn.forEach((button) => {
      button.addEventListener("click", () => {
        const clickedCountry = button.closest(".country").id;
        createCard(clickedCountry, infoCountriesDisplay);
      });
    });
  }

  //FUNÇÃO QUE CRIA O CARD ESPECIFICADO
  function createCard(clickedCountry, infoCountriesDisplay) {
    const htmlConsts = {
      search: html.get(".search"),
      filter: html.get(".filter"),
      pagination: html.get("#pagination"),
      countriesList: html.get(".countries-list"),
    };

    infoCountriesDisplay.forEach((infoCard) => {
      if (infoCard.name == clickedCountry) {
        htmlConsts.filter.classList.add("hidden");
        htmlConsts.search.classList.add("hidden");
        htmlConsts.pagination.classList.add("hidden");

        htmlConsts.countriesList.innerHTML = "";
        htmlConsts.countriesList.innerHTML = `<li class="card" id=${infoCard.name}>
            <input type="button" id="back-card-btn" value="&larr; Voltar">
            <div class = card-img>
              <img src="${infoCard.flag}" alt="Bandeira do País">
            </div>
            
            <div class="container__info-card">
              <h2 class="name-card">
                ${infoCard.name}
              </h2>
              <p class="p-card">
                <strong>Nome Nativo:</strong> ${infoCard.nativeName}
              </p>
              <p class="p-card">
                <strong>População:</strong> ${infoCard.population}
              </p>
              <p class="p-card">
                <strong>Continente:</strong> ${infoCard.continent}
              </p>
              <p class="p-card">
                <strong>Sub-Continente:</strong> ${infoCard.subRegion}
              </p>
              <p class="p-card">
                <strong>Capital:</strong> ${infoCard.capital}
              </p>
            </div>
            
            <div class="container__info-card
              <p class="p-card">
                <strong>Domínio de Topo:</strong> ${infoCard.tld}
              </p>
              <p class="p-card">
                <strong>Moeda:</strong> ${infoCard.currency}
              </p>
              <p class="p-card">
                <strong>Língua:</strong> ${infoCard.languages}
              </p>
            </div>
        </li>`;
      }
    });

    const backBtn = html.get("#back-card-btn");
    backCard(backBtn);
  }

  //FUNÇÃO DO BOTÃO DE VOLTAR DO CARD
  function backCard(backBtn) {
    backBtn.addEventListener("click", () => {
      const htmlConsts = {
        search: html.get(".search"),
        filter: html.get(".filter"),
        pagination: html.get("#pagination"),
        countriesInDisplay: html.getAll(".country"),
        card: html.get(".card"),
      };

      htmlConsts.search.classList.remove("hidden");
      htmlConsts.filter.classList.remove("hidden");
      htmlConsts.pagination.classList.remove("hidden");
      htmlConsts.card.remove();

      if (statePage == 1) {
        insertCountries();
      } else {
        updateCountries();
      }

      const afterClick = {
        countriesInDisplay: html.getAll(".country"),
        darkMode: html.get(".dark-mode-input"),
      };

      if (afterClick.darkMode.checked) {
        afterClick.countriesInDisplay.forEach((country) => {
          country.classList.add("darkElements");
        });
      }
    });
  }

  //FUNÇÃO QUE CRIA OS BOTÕES DA PAGINAÇÃO
  function createPaginationBtns() {
    const divPagination = html.get("#pagination-num");

    const arrayPagination = Array.from(
      Array(totalPages),
      (_, index) => index + 1
    );
    arrayPagination.forEach((element) => {
      paginationBtn = document.createElement("button");
      paginationBtn.innerHTML = element;
      paginationBtn.classList.add(
        "pagination-btn",
        "hidden",
        "pagination-number"
      );
      divPagination.appendChild(paginationBtn);
    });

    //IMPRIME SOMENTE OS 5 PRIMEIROS BOTÕES NA TELA
    const paginationBtns = html.getAll(".pagination-number");
    paginationBtns.forEach((element) => {
      if (element.innerHTML <= 5) {
        element.classList.remove("hidden");
      }
    });
  }
  createPaginationBtns();

  //FUNÇÃO QUE ENTENDE O CLICK NO BUTTON DA PAGINAÇÃO
  const paginationNumbers = html.getAll(".pagination-number");
  paginationNumbers.forEach((number) => {
    number.addEventListener("click", () => {
      statePage = Number(number.innerHTML);
      updateCountries();
      updatepagination();
    });
  });

  //FUNÇÃO DE UPDATE DA PAGINAÇÃO
  function updatepagination() {
    let maxRight = statePage + 2;
    let maxLeft = statePage - 2;
    if (statePage == 2) {
      maxLeft = 1;
      maxRight = 5;
    }
    if (statePage == 1) {
      maxLeft = 0;
      maxRight = 5;
    }

    const paginationBtns = html.getAll(".pagination-number");
    const rangepaginationShow = [];

    for (let i = maxLeft; i <= maxRight; i++) {
      rangepaginationShow.push(i);
    }

    paginationBtns.forEach((btn) => {
      let show = false;
      rangepaginationShow.forEach((numbShow) => {
        if (btn.innerHTML == String(numbShow)) {
          show = true;
        }
      });
      if (show) {
        btn.classList.remove("hidden");
      } else {
        btn.classList.add("hidden");
      }
    });
  }

  //FUNÇÃO DE UPDATE DOS PAÍSES
  function updateCountries() {
    let page = statePage - 1;
    let start = page * itemsPerPage;
    let end = start + itemsPerPage;
    const infoCountriesDisplay = [];
    countriesList.innerHTML = "";
    const darkMode = html.get(".dark-mode-input");
    const active = darkMode.checked;

    const countriesInfoPaginated = countriesInfo.slice(start, end);
    countriesInfoPaginated.forEach((info) => {
      const infoCountry = {
        borders: info.borders,
        capital: info.capital,
        continent: info.continent,
        currency: info.currency,
        flag: info.flag,
        languages: info.languages,
        name: info.name,
        nativeName: info.nativeName,
        population: info.population,
        subRegion: info.subRegion,
        tld: info.tld,
      };

      infoCountriesDisplay.push(infoCountry);

      countriesList.innerHTML += `<li class="country" id="${infoCountry.name}">
            <label class="country-label">
              <input type="button" class="country-btn">
              <div class = country-img>
                <img src="${infoCountry.flag}" alt="Bandeira do País">
              </div>
              <div class="container__info-country">
                <h2 class="name-country">
                  ${infoCountry.name}
                </h2>
                <p class="p-country">
                  <strong>População:</strong> ${infoCountry.population}
                </p>
                <p class="p-country">
                  <strong>Continente:</strong> ${infoCountry.continent}
                </p>
                <p class="p-country">
                  <strong>Capital:</strong> ${infoCountry.capital}
                </p>
              </div>
            </label>
          </li>`;
    });

    //CHAMA A FUNÇÃO QUE IDENTIFICA O CARD A SER CRIADO
    identifyCard(infoCountriesDisplay);

    //CASO ESTEJA APLICADO O DARK MODE, APLICA-SE ISSO EM TODA PAGINAÇÃO
    const country = html.getAll(".country");
    country.forEach((e) => {
      toggleDarkModeClass(e, "darkElements", active);
    });

    //CHAMA A FUNÇÃO QUE DA UPDATE NOS BOTÕES DE PAGINAÇÃO
    updatepagination();
  }

  //FUNÇÃO DE PESQUISA
  function search(countriesInfo) {
    const searchInput = html.get(".search");
    const countriesList = html.get(".countries-list");

    searchInput.addEventListener("input", () => {
      let searchText = searchInput.value;
      const darkMode = html.get(".dark-mode-input");

      countriesInfo.forEach((country) => {
        const infoCountry = {
          borders: country.borders,
          capital: country.capital,
          continent: country.continent,
          currency: country.currency,
          flag: country.flag,
          languages: country.languages,
          name: country.name,
          nativeName: country.nativeName,
          population: country.population,
          subRegion: country.subRegion,
          tld: country.tld,
        };

        const countryNameFormated = country.name.toUpperCase();
        let searchTextFormated = searchText.toUpperCase();

        if (countryNameFormated.includes(searchTextFormated)) {
          countriesList.innerHTML = `<li class="country" id="${infoCountry.name}">
              <label class="country-label">
                <input type="button" class="country-btn">
                <div class = country-img>
                  <img src="${infoCountry.flag}" alt="Bandeira do País">
                </div>
                <div class="container__info-country">
                  <h2 class="name-country">
                    ${infoCountry.name}
                  </h2>
                  <p class="p-country">
                    <strong>População:</strong> ${infoCountry.population}
                  </p>
                  <p class="p-country">
                    <strong>Continente:</strong> ${infoCountry.continent}
                  </p>
                  <p class="p-country">
                    <strong>Capital:</strong> ${infoCountry.capital}
                  </p>
                </div>
              </label>
            </li>`;
          infoCountryDisplay = [infoCountry];
        }
      });

      const countrieInDisplay = html.get(".country");
      const countrieInDisplayBtn = html.get(".country-btn");

      //VERIFICA SE PRECISA, E APLICA O DARK MODE
      if (darkMode.checked) {
        countrieInDisplay.classList.add("darkElements");
      }

      //CRIA O CARD DENTRO DA PESQUISA
      countrieInDisplayBtn.addEventListener("click", () => {
        createCard(countrieInDisplay.id, infoCountryDisplay);
      });

      //INSERE OS PAÍSES DE VOLTA NA TELA CASO A PESQUISA SEJA APAGADA
      if (searchText.length < 1) {
        if (statePage == 1) {
          countriesList.innerHTML = "";
          insertCountries();
        } else {
          countriesList.innerHTML = "";
          updateCountries();
        }

        //VERIFICA SE PRECISA, E APLICA O DARK MODE
        if (darkMode.checked) {
          const countriesInDisplay = html.getAll(".country");
          countriesInDisplay.forEach((country) => {
            country.classList.add("darkElements");
          });
        }
      }
    });
  }
  search(countriesInfo);

  //FUNÇÃO DO FILTRO
  function filter() {
    const filterInput = html.get(".filter");
    filterInput.addEventListener("change", () => {
      countriesList.innerHTML = "";
      const filterContinentFormated = filterInput.value.toLowerCase();
      let infoCountriesDisplay = [];
      const darkMode = html.get(".dark-mode-input");

      if (filterContinentFormated != "todos") {
        countriesInfo.forEach((country) => {
          const infoCountry = {
            borders: country.borders,
            capital: country.capital,
            continent: country.continent,
            currency: country.currency,
            flag: country.flag,
            languages: country.languages,
            name: country.name,
            nativeName: country.nativeName,
            population: country.population,
            subRegion: country.subRegion,
            tld: country.tld,
          };

          let continentFormated = country.continent
            .replace("South", "")
            .replace("North", "")
            .trim()
            .toLowerCase();

          if (continentFormated == filterContinentFormated) {
            countriesList.innerHTML += `<li class="country" id="${country.name}">
                <label class="country-label">
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
                </label>
              </li>`;
            infoCountriesDisplay.push(infoCountry);
          }
        });

        //CHAMA A FUNÇÃO QUE IDENTIFICA OS CARDS A SEREM CRIADOS
        identifyCard(infoCountriesDisplay);
      } else {
        insertCountries();
      }

      //VERIFICA SE PRECISA, E APLICA O DARK MODE
      if (darkMode.checked) {
        const countriesInDisplay = html.getAll(".country");
        countriesInDisplay.forEach((country) => {
          country.classList.add("darkElements");
        });
      }
    });
  }
  filter();
}

//FUNÇÃO DO DARK MODE
function toggleDarkModeClass(element, className, active) {
  darkImg = document.querySelector(".dark-mode-img");
  if (element == darkImg) {
    if (active) {
      darkImg.src = "http://127.0.0.1:5500/img/lua-clara.png";
    } else {
      darkImg.src = "http://127.0.0.1:5500/img/lua-escura.png";
    }
  }
  if (active) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

const htmlConsts = {
  darkMode: document.querySelector(".dark-mode-input"),
  header: document.querySelector("#header"),
  searchInp: document.querySelector(".search"),
  filterInp: document.querySelector(".filter"),
  title: document.querySelector(".title"),
  darkImg: document.querySelector(".dark-mode-img"),
};

htmlConsts.darkMode.addEventListener("change", () => {
  const active = htmlConsts.darkMode.checked;
  let country = document.querySelectorAll(".country");
  country.forEach((e) => {
    toggleDarkModeClass(e, "darkElements", active);
  });
  toggleDarkModeClass(document.body, "darkBody", active);
  toggleDarkModeClass(htmlConsts.header, "darkElements", active);
  toggleDarkModeClass(htmlConsts.searchInp, "darkElements", active);
  toggleDarkModeClass(htmlConsts.filterInp, "darkElements", active);
  toggleDarkModeClass(htmlConsts.title, "darkElements", active);
  toggleDarkModeClass(htmlConsts.darkImg, "darkElements", active);
});
