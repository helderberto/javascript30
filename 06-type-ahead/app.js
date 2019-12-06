(function() {
  const endpoint =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

  const searchRef = document.querySelector(".search");
  const suggestionsRef = document.querySelector(".suggestions");

  const state = {
    cities: [],
    searchValue: ""
  };

  function fetchCities() {
    return fetch(endpoint)
      .then(blob => blob.json())
      .then(data => state.cities.push(...data));
  }

  function findMatches(wordMatch, cities) {
    return cities.filter(place => {
      const regex = new RegExp(wordMatch, "gi");
      return place.city.match(regex) || place.state.match(regex);
    });
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function createHighlight(value) {
    const regex = new RegExp(state.searchValue, "gi");

    return value.replace(regex, `<span class="hl">${state.searchValue}</span>`);
  }

  function renderPlace(place) {
    const cityName = createHighlight(place.city);
    const stateName = createHighlight(place.state);

    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }

  function renderSuggestions(matches) {
    const placesHTML = matches.map(place => renderPlace(place)).join("");
    suggestionsRef.innerHTML = placesHTML;
  }

  function displayMatches() {
    const matchArray = findMatches(this.value, state.cities);
    state.searchValue = this.value;

    renderSuggestions(matchArray);
  }

  searchRef.addEventListener("change", displayMatches);
  searchRef.addEventListener("keyup", displayMatches);

  fetchCities();
})();
