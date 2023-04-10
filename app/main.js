import { infoCountries, paginatioDatas } from "./init.js";
import { insertFirstCountries } from "./countries.js";
import { identifyCard } from "./countries.js";
import { createPaginationBtns } from "./pagination.js";
import { listenerPaginationNumberClick } from "./pagination.js";
import { listenerPaginationControlClick } from "./pagination.js";
import { listenerSearch } from "./search.js";
import { filter } from "./filter.js";

const fetchCountries = await infoCountries();
const fetchPagination = await paginatioDatas(fetchCountries);

//----- FUNÇÕES REFERENTES AOS PAÍSES E SEUS CARDS -----/

//Insere os primeiros países na tela.
insertFirstCountries(fetchCountries, fetchPagination);

//Cria o card do país clicado.
identifyCard(fetchCountries, fetchPagination);

//----- FUNÇÕES REFERENTES À PAGINAÇÃO -----//

//Cria os botões da paginação.
createPaginationBtns(fetchPagination);

//Identifica o clique no botão enumerado da paginação.
listenerPaginationNumberClick(fetchPagination, fetchCountries);

//Identifica o clique no botão de controle da paginação.
listenerPaginationControlClick(fetchPagination, fetchCountries);

//----- FUNÇÃO REFERENTE À PESQUISA -----//
const searchInput = document.querySelector(".search");
searchInput.addEventListener("input", () => listenerSearch(fetchCountries));

//----- FUNÇÃO REFERENTE AO FILTRO -----//
filter(fetchCountries, fetchPagination);
