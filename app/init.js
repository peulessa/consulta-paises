//INFORMAÇÕES NECESSÁRIAS DE TODOS OS PAÍSES
export async function infoCountries() {
  try {
    const countriesFetch = await fetch("https://restcountries.com/v3.1/all");
    const countriesList = await countriesFetch.json();

    const allCountriesInfo = await Promise.all(
      countriesList.map(async (country) => {
        let flagInfo = country.flags.svg;
        let nameInfo = country.name.common;
        let nativeNameInfo = null;
        if (country.currencies) {
          let lenguageNativeName = Object.keys(country.name.nativeName)[0];
          nativeNameInfo = country.name.nativeName[lenguageNativeName].common;
        }

        let population = country.population;
        let continent = country.continents[0];
        let subRegion = null;
        country.subregion ? (subRegion = country.subregion) : "";

        let capitalInfo = null;
        country.capital ? (capitalInfo = country.capital[0]) : "";

        let tldInfo = null;
        country.tld ? (tldInfo = country.tld[0]) : "";

        let currencieInfo = null;
        if (country.currencies) {
          let firstCurrencie = Object.keys(country.currencies)[0];
          currencieInfo = country.currencies[firstCurrencie].name;
        }

        let languagesInfo = [];
        if (country.languages) {
          for (let language in country.languages) {
            languagesInfo.push(country.languages[language]);
          }
        }

        let bordersInfo = null;
        country.borders ? (bordersInfo = country.borders) : "";

        const countryInfo = {
          flag: flagInfo,
          name: nameInfo,
          nativeName: nativeNameInfo,
          population: population,
          continent: continent,
          subRegion: subRegion,
          capital: capitalInfo,
          tld: tldInfo,
          currency: currencieInfo,
          languages: languagesInfo,
          borders: bordersInfo,
        };

        return countryInfo;
      })
    );

    return allCountriesInfo;
  } catch (error) {
    throw new Error(
      "Não foi possível carregar a lista de países. Porfavor, tente novamente mais tarde"
    );
  }
};

//INFORMAÇÕES DA PAGINAÇÃO USADAS EM TODO CÓDIGO
export async function paginatioDatas(fetchCountries){
  console.log(fetchCountries);
  const totalItems = fetchCountries.length;
  const itemsPerPage = 12;

  const datas = {
    totalItems: totalItems,
    itemsPerPage: itemsPerPage,
    totalPages: Math.ceil(totalItems / itemsPerPage),
    statePage: 1,
  }

  return datas;
}