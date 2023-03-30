/*//VARIÁVEIS DOS ELEMENTOS HTML
const sectionCards = document.querySelector(".container__cards");
const search = document.querySelector(".pesquisa");
const filer = document.querySelector("#filtro");
const darkMode = document.querySelector(".dark-mode-input");
const header = document.querySelector(".cabecalho");*/

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
async function init(countriesInfo) {
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

  //CONTROLES DA PAGINAÇÃO QUE CHAMAM A FUNÇÃO UPDATE
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

  //FUNÇÃO DE UPDATE
  function update() {
    let page = statePage - 1;
    let start = page * itemsPerPage;
    let end = start + itemsPerPage;
    countriesList.innerHTML = "";

    const countriesInfoPaginated = countriesInfo.slice(start, end);
    countriesInfoPaginated.forEach((info) => {
      let borders = info.borders;
      let capital = info.capital;
      let continent = info.continent;
      let currency = info.currency;
      let flag = info.flag;
      let languages = info.languages;
      let name = info.name;
      let nativeName = info.nativeName;
      let population = info.population;
      let subRegion = info.subRegion;
      let tld = info.tld;

      countriesList.innerHTML += `<li class="country">
          <label class="country-label">
            <input type="button" class="country-btn">
            <img src="${flag}" alt="Bandeira do País">
            <div class="container__info-country">
              <h2 class="name-country">
                ${name}
              </h2>
              <p class="p-country">
                <strong>População:</strong> ${population}
              </p>
              <p class="p-country">
                <strong>Continente:</strong> ${continent}
              </p>
              <p class="p-country">
                <strong>Capital:</strong> ${capital}
              </p>
            </div>
          </label>
        </li>`;
    });
    updatepagination();
  }

  //FUNÇÃO QUE INSERE OS PRIMEIROS PAÍSES NA TELA
  function insertCountries() {
    const firstCountries = countriesInfo.slice(0, itemsPerPage);
    firstCountries.forEach((info) => {
      let borders = info.borders;
      let capital = info.capital;
      let continent = info.continent;
      let currency = info.currency;
      let flag = info.flag;
      let languages = info.languages;
      let name = info.name;
      let nativeName = info.nativeName;
      let population = info.population;
      let subRegion = info.subRegion;
      let tld = info.tld;

      countriesList.innerHTML += `<li class="country">
          <label class="country-label">
            <input type="button" class="country-btn">
            <img src="${flag}" alt="Bandeira do País">
            <div class="container__info-country">
              <h2 class="name-country">
                ${name}
              </h2>
              <p class="p-country">
                <strong>População:</strong> ${population}
              </p>
              <p class="p-country">
                <strong>Continente:</strong> ${continent}
              </p>
              <p class="p-country">
                <strong>Capital:</strong> ${capital}
              </p>
            </div>
          </label>
        </li>`;
    });
  }
  insertCountries();

  //FUNÇÃO QUE CRIA OS BOTÕES DO pagination
  function createpaginationBtns() {
    const divpagination = html.get("#pagination-num");

    const arraypagination = Array.from(
      Array(totalPages),
      (_, index) => index + 1
    );
    arraypagination.forEach((element) => {
      paginationBtn = document.createElement("button");
      paginationBtn.innerHTML = element;
      paginationBtn.classList.add(
        "pagination-btn",
        "hidden",
        "pagination-number"
      );
      divpagination.appendChild(paginationBtn);
    });

    //IMPRIME SOMENTE OS 5 PRIMEIROS BOTÕES NA TELA
    const paginationBtns = html.getAll(".pagination-number");
    paginationBtns.forEach((element) => {
      if (element.innerHTML <= 5) {
        element.classList.remove("hidden");
      }
    });
  }
  createpaginationBtns();

  //FUNÇÃO QUE ENTENDE O CLICK NO pagination
  const paginationNumbers = html.getAll('.pagination-number')
  paginationNumbers.forEach(number => {
    number.addEventListener('click', () => {
      statePage = number.innerHTML
      update()
      updatepagination()
    })
  })

  //FUNÇÃO DE UPDATE DO pagination
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
}
















// //FUNÇÃO DO INPUT DE PESQUISA
// pesquisa.addEventListener("click", iniciarPesquisa);
// function iniciarPesquisa() {
//   let listaNomes = document.querySelectorAll(".nome-pais");

//   pesquisa.addEventListener("input", visibilidadePais);

//   function visibilidadePais() {
//     let textoPesquisaFormatado = pesquisa.value.toLowerCase();

//     listaNomes.forEach((nome) => {
//       let containerPais = nome.closest(".container__pais");
//       let nomeFormatado = nome.innerText.toLowerCase();
//       if (nomeFormatado.includes(textoPesquisaFormatado)) {
//         containerPais.classList.remove("hidden");
//       } else {
//         containerPais.classList.add("hidden");
//       }
//     });
//   }
// }

// // FUNÇÃO DO SELECT DO FILTRO
// filtro.addEventListener("click", filtroRegioes);
// function filtroRegioes() {
//   filtro.addEventListener("change", () => {
//     const continenteFiltro = filtro.value;
//     let listaContinentes = document.querySelectorAll(".continente");

//     listaContinentes.forEach((continentePais) => {
//       let containerPais = continentePais.closest(".container__pais");
//       let continenteFormatado = continentePais.innerText
//         .replace("Continente:", "")
//         .replace("South", "")
//         .replace("North", "")
//         .trim();

//       if (
//         continenteFiltro == continenteFormatado &&
//         continenteFiltro != "Todos"
//       ) {
//         containerPais.classList.remove("hiddenFiltro");
//       } else if (continenteFiltro != "Todos") {
//         containerPais.classList.add("hiddenFiltro");
//       } else {
//         containerPais.classList.remove("hiddenFiltro");
//       }
//     });
//   });
// }

// //FUNÇÃO QUE ABRE O CARD DE INFORMAÇÕES
// function abreCards(botaoCard) {
//   botaoCard.forEach((botao) => {
//     botao.addEventListener("click", () => {
//       let i = botao.closest(".container__pais").id;

//       sectionPaises.classList.add("hidden");
//       pesquisa.classList.add("hidden");
//       filtro.classList.add("hidden");

//       sectionCards.innerHTML = `
//         <div class="container__card">
//           <input type="button" class="voltar-btn" value="&larr; Voltar">

//           <div class="container__conteudo">
//             <img src="${bandeira[i]}" alt="Bandeira do País">

//             <div class="container__informacoes-card">
//               <div class="container__info-card">
//                 <h2 class="nome-pais">
//                   ${nome[i]}
//                 </h2>
//                 <p class="paragrafo-card populacao">
//                   <strong>População:</strong> ${populacao[i]}
//                 </p>
//                 <p class="paragrafo-card continente">
//                   <strong>Continente:</strong> ${continente[i]}
//                 </p>
//                 <p class="paragrafo-card subContinente">
//                   <strong>Sub-Continente:</strong> ${subContinente[i]}
//                 </p>
//                 <p class="paragrafo-card capital">
//                   <strong>Capital:</strong> ${capital[i]}
//                 </p>
//               </div>

//               <div class="container__info-card-2">
//                 <p class="paragrafo-card tld">
//                   <strong>TLD:</strong> ${tld[i]}
//                 </p>
//                 <p class="paragrafo-card moeda">
//                   <strong>Moeda:</strong> ${moeda[i]}
//                 </p>
//                 <p class="paragrafo-card lingua">
//                   <strong>Língua:</strong> ${lingua[i]}
//                 </p>
//               </div>
//             </div>
//           </div>`;

//       const botaoVoltar = document.querySelector(".voltar-btn");
//       voltar(botaoVoltar);
//     });
//   });

//   //FUNÇÃO DO BOTÃO VOLTAR
//   function voltar(botaoVoltar) {
//     botaoVoltar.addEventListener("click", () => {
//       sectionPaises.classList.remove("hidden");
//       pesquisa.classList.remove("hidden");
//       filtro.classList.remove("hidden");

//       sectionCards.innerHTML = "";
//     });
//   }
// }

// //FUNÇÃO DO DARK MODE
// function toggleDarkModeClass(elemento, className, ativado) {
//   if (ativado) {
//     elemento.classList.add(className);
//   } else {
//     elemento.classList.remove(className);
//   }
// }

// darkMode.addEventListener('change', () => {
//   const ativado = darkMode.checked;
//   let containerPais = document.querySelectorAll(".container__pais")
//   containerPais.forEach(container => {
//     toggleDarkModeClass(container, 'elementosDark', ativado);
//   })
//   toggleDarkModeClass(document.body, 'bodyDark', ativado);
//   toggleDarkModeClass(cabecalho, 'elementosDark', ativado);
//   toggleDarkModeClass(pesquisa, 'elementosDark', ativado);
//   toggleDarkModeClass(filtro, 'elementosDark', ativado);
// });
