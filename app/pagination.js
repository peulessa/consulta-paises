import { updateCountries } from "./countries.js";
import { countriesPagination } from "./main.js";

//FUNÇÃO QUE CRIA OS BOTÕES DA PAGINAÇÃO
export async function createPaginationBtns(countriesPagination) {
  //CRIA OS BOTÕES DE CONTROLE E A DIV DOS BOTÕES NUMERADOS
  const paginationSection = document.querySelector("#pagination");
  paginationSection.innerHTML = `<button class="pagination-btn" id="first">&laquo;</button>
    <button class="pagination-btn" id="prev">&lt;</button>
    <div id="pagination-num"></div>
    <button class="pagination-btn" id="next">&gt;</button>
    <button class="pagination-btn" id="last">&raquo;</button>`;

  //CRIA OS BOTÕES NUMERADOS E INSERE NA SUA RESPECTIVA DIV
  const divPagination = document.querySelector("#pagination-num");

  const arrayPagination = Array.from(
    Array(countriesPagination.totalPages),
    (_, index) => index + 1
  );
  arrayPagination.forEach((element) => {
    const paginationBtn = document.createElement("button");
    paginationBtn.innerHTML = element;
    paginationBtn.classList.add(
      "pagination-btn",
      "hidden",
      "pagination-number"
    );
    divPagination.appendChild(paginationBtn);
  });

  //IMPRIME SOMENTE OS 5 PRIMEIROS BOTÕES NUMERADOS NA TELA
  const paginationBtns = document.querySelectorAll(".pagination-number");
  paginationBtns.forEach((element) => {
    if (element.innerHTML <= 5) {
      element.classList.remove("hidden");
    }
  });
}

//CONTROLES DA PAGINAÇÃO
const controls = (countriesPagination) => ({
  next() {
    countriesPagination.statePage++;
    countriesPagination.statePage > countriesPagination.totalPages
      ? countriesPagination.statePage--
      : "";
    updateCountries(countriesPagination.statePage, countriesPagination);
  },
  prev() {
    countriesPagination.statePage--;
    countriesPagination.statePage < 1 ? countriesPagination.statePage++ : "";
    updateCountries(countriesPagination.statePage, countriesPagination);
  },
  first() {
    countriesPagination.statePage = 1;
    updateCountries(countriesPagination.statePage, countriesPagination);
  },
  last() {
    countriesPagination.statePage = countriesPagination.totalPages;
    updateCountries(countriesPagination.statePage, countriesPagination);
  },
});

//FUNÇÃO QUE ENTENDE O CLICK NO BOTÃO DE CONTROLE DA PAGINAÇÃO
export function listenerPaginationControlClick(countriesPagination) {
  const newControl = controls(countriesPagination);

  const pagination = document.querySelector("#pagination");
  pagination.addEventListener("click", (event) => {
    const target = event.target;
    if (target.id == "next") {
      newControl.next();
    } else if (target.id == "prev") {
      newControl.prev();
    } else if (target.id == "last") {
      newControl.last();
    } else if (target.id == "first") {
      newControl.first();
    }
  });
}

//FUNÇÃO QUE ENTENDE O CLICK NO BOTÃO NUMERADO DA PAGINAÇÃO
export function listenerPaginationNumberClick(countriesPagination) {
  const paginationSection = document.querySelector("#pagination");
  paginationSection.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("pagination-number")) {
      countriesPagination.statePage = Number(target.innerHTML);
      updatepagination();
      updateCountries(countriesPagination.statePage, countriesPagination);
    }
  });
}

//-----------------------------------------------------------------------------------------------------------------------------//

//FUNÇÃO DE UPDATE DOS NÚMEROS DA PAGINAÇÃO INSERIDOS NA TELA
export function updatepagination() {
  let maxRight = countriesPagination.statePage + 2;
  let maxLeft = countriesPagination.statePage - 2;
  if (countriesPagination.statePage == 2) {
    maxLeft = 1;
    maxRight = 5;
  }
  if (countriesPagination.statePage == 1) {
    maxLeft = 0;
    maxRight = 5;
  }

  const paginationBtns = document.querySelectorAll(".pagination-number");
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
