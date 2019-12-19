// 'use strict';
const apiKey = ;
const searchURL = 'https://api.github.com';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');

}

function displayResults(responseJson) {
   console.log(responseJson);
   $('#results-list').empty();
   for (let i = 0; i < responseJson.owner.length ; i++){
     //Must display the repo name and link to repo(url)
     $('#results-list').append(
      `
      <li><h2>${responseJson.name[i]}</h2></li>
      <li><h3><a href="${responseJson.url[i]}"></a></h3></li>
      `
    )};

    $('#results').removeClass('hidden');
};

function getUser(query) {
  const params = {
    q: query,
    language: "en",
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
    "thedudefreebird": apiKey})
  };

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchUser = $('#js-search-user').val();
    getUser(searchUser);
  });
}

$(watchForm);
