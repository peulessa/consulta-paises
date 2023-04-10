import { paginatioDatas } from "./init.js";
import { insertFirstCountries } from "./countries.js";
import { identifyCard } from "./countries.js";
import { createPaginationBtns } from "./pagination.js";
import { listenerPaginationControlClick } from "./pagination.js";
import { listenerPaginationNumberClick } from "./pagination.js";
import { listenerSearch } from "./search.js";

let filterdCountries = [];
export async function filter(fetchCountries, fetchPagination) {
  const filterInput = document.querySelector(".filter");

  filterInput.addEventListener("change", async () => {
    const filterValue = filterInput.value.toLowerCase();
    filterdCountries = [];

    fetchCountries.forEach((element) => {
      const continent = element.continent
        .toLowerCase()
        .replace("south", "")
        .replace("north", "")
        .trim();

      if (continent == filterValue) {
        filterdCountries.push(element);
      }
    });

    if (filterValue != "todos") {
      const newFetchPagination = await paginatioDatas(filterdCountries);
      const newFetchCountries = filterdCountries;

      insertFirstCountries(newFetchCountries, newFetchPagination);
      identifyCard(newFetchCountries, newFetchPagination);
      createPaginationBtns(newFetchPagination, newFetchCountries);
      listenerPaginationControlClick(newFetchPagination, newFetchCountries);
      listenerPaginationNumberClick(newFetchPagination, newFetchCountries);
    } else {
      insertFirstCountries(fetchCountries, fetchPagination);
      identifyCard(fetchCountries, fetchPagination);
      createPaginationBtns(fetchPagination, fetchCountries);
      listenerPaginationControlClick(fetchPagination, fetchCountries);
      listenerPaginationNumberClick(fetchPagination, fetchCountries);
    }

    //VERIFICADOR DO DARK-MODE
    const countries = document.querySelectorAll(".country");
    const darkMode = document.querySelector(".dark-mode-input");

    if (darkMode.checked) {
      countries.forEach((element) => {
        element.classList.add("darkElements");
      });
    }
  });
}
