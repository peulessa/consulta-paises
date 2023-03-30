// //RECEBE E CONVERTE OS DADOS DA API DOS PAÍSES
// tratandoApi()
// async function tratandoApi() {
//   const fetchCountries = await fetch("https://restcountries.com/v3.1/all");
//   const countriesList = await fetchCountries.json();

//   countriesList.map((pais) => {
//     pais.name.common
//   })
// }

const countries = []

async function informacoesPaises() {
  const countriesFetch = await fetch("https://restcountries.com/v3.1/all");
  const countriesList = await countriesFetch.json();

  await Promise.all(countriesList.map(async (country) => {
    const info = {
      flags: { svg: flagSvg },
      name: { common: nomeComum },
      population,
      continents,
      subregion,
      capital: [paisCapital] = [],
      tld: [firstTld] = [],
      currencies,
      languages,
    } 
    = country;

    countries.push(info)

    if (currencies) {
      const nomeMoeda1 = Object.keys(currencies)[0];
      countries.push(currencies[nomeMoeda1].name);
    } else {
      countries.push('');
    }

    if (languages) {
      const nomeLingua1 = Object.keys(languages)[0];
      countries.push(languages[nomeLingua1]);
    } else {
        countries.push('');
    }
  }));
}

informacoesPaises();