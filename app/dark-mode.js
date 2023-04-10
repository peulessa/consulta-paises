//FUNÇÃO DO DARK MODE
function toggleDarkModeClass(element, className, active) {
  if (active) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

const html = {
  title: document.querySelector(".title"),
  header: document.querySelector("#header"),
  searchInp: document.querySelector(".search"),
  filterInp: document.querySelector(".filter"),
  darkMode: document.querySelector(".dark-mode-input"),
  button: document.querySelector(".back-card-btn"),
};

export function callDark() {
  const active = html.darkMode.checked;
  let country = document.querySelectorAll(".country");
  country.forEach((e) => {
    toggleDarkModeClass(e, "darkElements", active);
  });
  toggleDarkModeClass(html.title, "darkElements", active);
  toggleDarkModeClass(document.body, "darkBody", active);
  toggleDarkModeClass(html.header, "darkElements", active);
  toggleDarkModeClass(html.searchInp, "darkElements", active);
  toggleDarkModeClass(html.filterInp, "darkElements", active);
}
