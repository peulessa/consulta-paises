

export function filter() {
  const filterInput = document.querySelector(".filter");
  let filterdCountries = [];

  filterInput.addEventListener("change", () => {
    const filterValue = filterInput.value.toLowerCase();
    filterdCountries = [];

    info.forEach((element) => {
      const continent = element.continent
        .toLowerCase()
        .replace("south", "")
        .replace("north", "")
        .trim();

      if (continent == filterValue) {
        filterdCountries.push(element);
      }
    });
  });
}
