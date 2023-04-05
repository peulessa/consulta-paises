import { infoCountries } from "./init.js";
import { paginatioDades } from "./init.js";
import { updateCountries } from "./countries.js";
const info = await infoCountries();
const dades = await paginatioDades();

//FUNÇÃO QUE CRIA OS BOTÕES DA PAGINAÇÃO
export async function createPaginationBtns() {
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
    Array(dades.totalPages),
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
const controls = {
  next() {
    dades.statePage++;
    dades.statePage > dades.totalPages ? dades.statePage-- : "";
    updateCountries(dades.statePage);
  },
  prev() {
    dades.statePage--;
    dades.statePage < 1 ? dades.statePage++ : "";
    updateCountries(dades.statePage);
  },
  first() {
    dades.statePage = 1;
    updateCountries(dades.statePage);
  },
  last() {
    dades.statePage = dades.totalPages;
    updateCountries(dades.statePage);
  },
};

//FUNÇÃO QUE ENTENDE O CLICK NO BOTÃO DE CONTROLE DA PAGINAÇÃO
export function listenerPaginationControlClick() {
  const pagination = document.querySelector("#pagination");
  pagination.addEventListener("click", (event) => {
    const target = event.target;
    if (target.id == "next") {
      controls.next();
    } else if (target.id == "prev") {
      controls.prev();
    } else if (target.id == "last") {
      controls.last();
    } else if (target.id == "first") {
      controls.first();
    }
  });
}

//FUNÇÃO QUE ENTENDE O CLICK NO BOTÃO NUMERADO DA PAGINAÇÃO
export function listenerPaginationNumberClick() {
  const paginationSection = document.querySelector("#pagination");
  paginationSection.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("pagination-number")) {
      dades.statePage = Number(target.innerHTML);
      updatepagination();
      updateCountries(dades.statePage);
    }
  });
}

//-----------------------------------------------------------------------------------------------------------------------------//

//FUNÇÃO DE UPDATE DOS NÚMEROS DA PAGINAÇÃO INSERIDOS NA TELA
function updatepagination() {
  let maxRight = dades.statePage + 2;
  let maxLeft = dades.statePage - 2;
  if (dades.statePage == 2) {
    maxLeft = 1;
    maxRight = 5;
  }
  if (dades.statePage == 1) {
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
