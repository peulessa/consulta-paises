import { infoCountries, paginatioDatas } from "./init.js";
const fetchCountries = await infoCountries();
const fetchPagination = await paginatioDatas();


//----- FUNÇÕES REFERENTES AOS PAÍSES E SEUS CARDS -----/

//Insere os primeiros países na tela.
import { insertFirstCountries } from "./countries.js";
insertFirstCountries(fetchCountries, fetchPagination);

//Cria o card do país clicado.
import { identifyCard } from "./countries.js";
identifyCard(fetchCountries, fetchPagination);

//----- FUNÇÕES REFERENTES À PAGINAÇÃO -----//

//Cria os botões da paginação.
import { createPaginationBtns } from "./pagination.js";
createPaginationBtns(fetchPagination);

//Identifica o clique no botão enumerado da paginação.
import { listenerPaginationNumberClick } from "./pagination.js";
listenerPaginationNumberClick(fetchPagination, fetchCountries);

//Identifica o clique no botão de controle da paginação.
import { listenerPaginationControlClick } from "./pagination.js";
listenerPaginationControlClick(fetchPagination, fetchCountries);

// //----- FUNÇÃO REFERENTE À PESQUISA -----//
// import { search } from "./search.js";


// //----- FUNÇÕES REFERENTES AO FILTRO -----//
// import { filter } from "./filter.js";
// filter();