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

  //ELEMENTOS HTML USADOS EM TODA A FUNÇÃO
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
        update();
      });

      html.get("#prev").addEventListener("click", () => {
        controls.prev();
        update();
      });

      html.get("#first").addEventListener("click", () => {
        controls.first();
        update();
      });

      html.get("#last").addEventListener("click", () => {
        controls.last();
        update();
      });
    },
  };
  controls.createListeners();

  //FUNÇÃO QUE INSERE OS PRIMEIROS PAÍSES NA TELA
  function insertCountries() {
    const firstCountries = countriesInfo.slice(0, itemsPerPage);
    const infoCountriesDisplay = []
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

      infoCountriesDisplay.push(infoCountry)

      countriesList.innerHTML += `<li class="country" id=${infoCountry.name}>
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
  function identifyCard(infoCountriesDisplay){
    countriesDisplayBtn = document.querySelectorAll('.country-btn');
    countriesDisplayBtn.forEach(button =>{
      button.addEventListener('click', () =>{
        const clickedCountry = button.closest('.country').id;
        createCard(clickedCountry, infoCountriesDisplay);
      });
    });
  };

  //FUNÇÃO QUE CRIA O CARD ESPECIFICADO
  function createCard(clickedCountry, infoCountriesDisplay){
    console.log(infoCountriesDisplay, clickedCountry);
    const htmlConsts ={
      search: document.querySelector('.search'),
      filter: document.querySelector('.filter'),
      pagination: document.querySelector('#pagination')
    }

    infoCountriesDisplay.forEach(infoCard =>{

      if(infoCard.name == clickedCountry){
        htmlConsts.filter.classList.add('hidden');
        htmlConsts.search.classList.add('hidden');
        htmlConsts.pagination.classList.add('hidden');
        countriesList.innerHTML=''
        countriesList.innerHTML=
        `<li class="card" id=${infoCard.name}>
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
    })
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
      update();
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
  function update() {
    let page = statePage - 1;
    let start = page * itemsPerPage;
    let end = start + itemsPerPage;
    const infoCountriesDisplay = [];
    countriesList.innerHTML = "";
    const darkMode = document.querySelector(".dark-mode-input");
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

      infoCountriesDisplay.push(infoCountry)

      countriesList.innerHTML += `<li class="country" id=${infoCountry.name}>
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
    const country = document.querySelectorAll(".country");
    country.forEach((e) => {
      toggleDarkModeClass(e, "darkElements", active);
    });

    //CHAMA A FUNÇÃO QUE DA UPDATE NOS BOTÕES DE PAGINAÇÃO
    updatepagination();
  }
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
})

