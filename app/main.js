//----- FUNÇÕES REFERENTES AOS PAÍSES E SEUS CARDS -----/
import { infoCountries, paginationDadas } from "./init.js";
import { insertFirstCountries } from "./countries.js";
import { identifyCard } from "./countries.js";
import { search } from "./search.js";
import { createPaginationBtns } from "./pagination.js";
import { listenerPaginationControlClick } from "./pagination.js";
import { listenerPaginationNumberClick } from "./pagination.js";
import { filter } from "./filter.js";

export const countriesList = [];
let fetchPagination;

const fetchCountries = await infoCountries();
countriesList.push(...fetchCountries);
fetchPagination = await paginationDadas(countriesList);

export const countriesPagination = fetchPagination;

insertFirstCountries(countriesList, countriesPagination);

//Cria o card do país clicado.
identifyCard();

//Cria os botões da paginação.
createPaginationBtns(countriesPagination);

//Identifica o clique no botão enumerado da paginação.
listenerPaginationNumberClick(countriesPagination);

//Identifica o clique no botão de controle da paginação.
listenerPaginationControlClick(countriesPagination);

//----- FUNÇÃO REFERENTE À PESQUISA -----//
const input = document.querySelector(".search");
input.addEventListener("input", () => search(countriesList));

//----- FUNÇÕES REFERENTES AO FILTRO -----//
filter();
