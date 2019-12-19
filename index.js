// 'use strict';
const apiKey = '90030a150d60ac0caa4c4e009ba553982ec368e0';
const searchURL = 'https://api.github.com';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');

// function displayResults(responseJson) {
//   console.log(responseJson);
//   $('#results-list').empty();
//   $('#results-list').append(
//       `<li><h3><a href="${responseJson.articles[i].url}">${responseJson.articles[i].title}</a></h3>
//       <p>${responseJson.articles[i].source.name}</p>
//       <p>By ${responseJson.articles[i].author}</p>
//       <p>${responseJson.articles[i].description}</p>
//       <img src='${responseJson.articles[i].urlToImage}'>
//       </li>`
//     )};
//   $('#results').removeClass('hidden');
// };

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
