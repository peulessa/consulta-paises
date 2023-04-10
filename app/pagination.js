import { updateCountries } from "./countries.js";

//FUNÇÃO QUE CRIA OS BOTÕES DA PAGINAÇÃO
export async function createPaginationBtns(fetchPagination) {
  
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
    Array(fetchPagination.totalPages),
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
  next(fetchPagination, fetchCountries) {
    fetchPagination.statePage++;
    fetchPagination.statePage > fetchPagination.totalPages ? fetchPagination.statePage-- : "";
    updateCountries(fetchPagination.statePage,fetchPagination, fetchCountries);
    updatepagination(fetchPagination)
  },
  prev(fetchPagination, fetchCountries) {
    fetchPagination.statePage--;
    fetchPagination.statePage < 1 ? fetchPagination.statePage++ : "";
    updateCountries(fetchPagination.statePage,fetchPagination, fetchCountries);
    updatepagination(fetchPagination)
  },
  first(fetchPagination, fetchCountries) {
    fetchPagination.statePage = 1;
    updateCountries(fetchPagination.statePage,fetchPagination, fetchCountries);
    updatepagination(fetchPagination)
  },
  last(fetchPagination, fetchCountries) {
    fetchPagination.statePage = fetchPagination.totalPages;
    updateCountries(fetchPagination.statePage,fetchPagination, fetchCountries);
    updatepagination(fetchPagination)
  },
};

//FUNÇÃO QUE ENTENDE O CLICK NO BOTÃO DE CONTROLE DA PAGINAÇÃO
export function listenerPaginationControlClick(fetchPagination, fetchCountries) {
  const pagination = document.querySelector("#pagination");
  pagination.addEventListener("click", (event) => {
    const target = event.target;
    if (target.id == "next") {
      controls.next(fetchPagination, fetchCountries);
    } else if (target.id == "prev") {
      controls.prev(fetchPagination, fetchCountries);
    } else if (target.id == "last") {
      controls.last(fetchPagination, fetchCountries);
    } else if (target.id == "first") {
      controls.first(fetchPagination, fetchCountries);
    }
  });
}

//FUNÇÃO QUE ENTENDE O CLICK NO BOTÃO NUMERADO DA PAGINAÇÃO
export function listenerPaginationNumberClick(fetchPagination, fetchCountries) {
  const paginationSection = document.querySelector("#pagination");
  paginationSection.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("pagination-number")) {
      fetchPagination.statePage = Number(target.innerHTML);
      updatepagination(fetchPagination);
      updateCountries(fetchPagination.statePage, fetchPagination, fetchCountries);
    }
  });
}

//-----------------------------------------------------------------------------------------------------------------------------//

//FUNÇÃO DE UPDATE DOS NÚMEROS DA PAGINAÇÃO INSERIDOS NA TELA
export function updatepagination(fetchPagination) {
  console.log(fetchPagination);
  let maxRight = fetchPagination.statePage + 2;
  let maxLeft = fetchPagination.statePage - 2;
  if (fetchPagination.statePage == 2) {
    maxLeft = 1;
    maxRight = 5;
  }
  if (fetchPagination.statePage == 1) {
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
