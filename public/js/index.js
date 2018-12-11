const axios = require("axios");
const renderAllMovies = require("./render-movies");
const renderShowPage = require("./render-show-page");
const newPostButton = require("./post-button");
const { parseQueryString } = require("./utility");
const server = "https://the-online-movie-database.herokuapp.com";

/*
 *  Constructs the an html element that is a table containing all the movies in
 *  the database.
 */
window.buildMovieIndex = function() {
  axios.get(server + "/movies")
  .then(res => {

    renderAllMovies(res.data)
  })
  .catch(err => console.log(err));
}

/*
 *  Constructs a show page for a given movie.
 */
window.buildMoviePage = function(edit) {
  const id = parseQueryString(window.location.search).id;

  // if (typeof id === 'undefined') {
  //   window.location.replace("404.html");
  // } else {
    axios.get(server + "/movies/" + id)
    .then(res => renderShowPage(res.data[0], edit))
    .catch(err => console.log(err));
  // }
}

window.buildNewPostPage = function() {
  renderShowPage(null, true)
}
