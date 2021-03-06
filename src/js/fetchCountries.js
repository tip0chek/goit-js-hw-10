import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';

export default class DataFetch {
  constructor() {
    this.inputValue = '';
    console.log(this.inputValue);
  }
  fetchCountries() {    
    const URL = `${BASE_URL}${this.inputValue}?fields=name,capital,population,flags,languages,`;
    return fetch(URL)
      .then(response => response.json())
      .then(countries => {
        if (countries.status === 404) {
          return Notiflix.Notify.failure(`"Oops, there is no country with that name"`);
        } else if (countries.length > 10) {
          return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
        return countries;
      })
      .catch(event => {
        Notiflix.Notify.failure(`"Oops, there is no country with that name"`);
      });
  }
  get value() {
    return this.inputValue;
  }
  set value(country) {
    this.inputValue = country;
  }
}