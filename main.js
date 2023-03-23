imprimeTodosPaises();
async function imprimeTodosPaises() {
  let tp = await fetch("https://restcountries.com/v3.1/all");
  let todosPaises = await tp.json();

  // IMPRIME TODOS OS PAÍSES NA TELA //
  todosPaises.forEach((element) => {
    let bandeira = element.flags.svg;
    let nome = element.name.common;
    let populacao = element.population;
    let continente = element.continents;
    if (element.capital) {
      capital = element.capital[0];
    }
    let subRegiao = element.subregion;

    let divPaises = document.querySelector(".container__paises");

    divPaises.innerHTML += `<div class="container__pais">
                <label class="pais-label">
                    <input type="button" class="pais-btn">
                    <img src="${bandeira}" alt="Bandeira do País">
                    <div class="container__info-paises">
                        <h2 class="nome-pais">
                        ${nome}
                        </h2>
                        <p class="paragrafo-pais">
                            <strong>População:</strong> ${populacao}
                        </p>
                        <p class="paragrafo-pais">
                            <strong>Continente:</strong> ${continente}
                        </p>
                        <p class="paragrafo-pais">
                            <strong>Capital:</strong> ${capital}
                        </p>
                    </div>
                </label>
            </div>`;
  });

  // PESQUISA TODOS OS PAÍSES NA TELA //
  let nomePaises = document.querySelectorAll(".nome-pais");
  let nomePaisesArray = Array.from(nomePaises);
  let inputPesquisa = document.querySelector(".pesquisa");

  function escondePaises() {
    nomePaisesArray
      .filter(
        (element) =>
          !element.innerText
            .toLowerCase()
            .includes(inputPesquisa.value.toLowerCase())
      )
      .forEach((element) => {
        element.closest(".container__pais").classList.add("hidden");
      });
  }

  function mostraPaises() {
    nomePaisesArray
      .filter((element) =>
        element.innerText
          .toLowerCase()
          .includes(inputPesquisa.value.toLowerCase())
      )
      .forEach((element) => {
        element.closest(".container__pais").classList.remove("hidden");
      });
  }

  inputPesquisa.addEventListener("input", () => {
    escondePaises();
    mostraPaises();
  });
}
