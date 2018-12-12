const axios = require("axios");

const server = "https://the-online-movie-database.herokuapp.com";

/*
 *  Takes and event object (e).
 *  Takes the user to the movie page.
 *  Returns nothing.
 */
function cancelHandler(e) {
  const id = e.target.getAttribute("data_id");
  location.href = "/list.html";
}

/*
 *  Takes and event object (e).
 *  Takes the user to the edit page.
 *  Returns nothing.
 */
function editHandler(e) {
  const id = e.target.getAttribute("data_id");
  location.href = "/edit.html?id=" + id;
}

function buildEntry() {
  // Below, so that we can iterate over the list (can't normally on NodeList)
  const inputs = document.querySelectorAll("input[type=\'text\']").entries();
  const values = {}; // Will hold our final values

  // Iterate over our list of nodes
  for ([ _index, input ] of inputs) {
    let field = input.getAttribute("name");
    values[field] = input.value;
  }

  return values;
}

/*
 *  Takes an event object (e).
 *  Submits the entry to the movie server via patch.
 *  Returns nothing.
 */
function updateHandler(e) {
  const id = e.target.getAttribute("data_id"); // Get the HTML stored movie id
  const values = buildEntry();

  values.id = id;

  axios.patch(server + "/movies/" + id, values)
    .then(response => {
      window.location.href = "/movie.html?id=" + id;
    })
    .catch(err => {
      console.log(err);
    });
}

/*
 *  Takes an event object (e).
 *  Submits the entry to the movie server via post.
 *  Returns nothing.
 */
function newMovieHandler(e) {
  // const id = e.target.getAttribute("data_id");
  const values = buildEntry();

  axios.post(server + "/movies", values)
    .then(response => {
      window.location.href = "/movie.html?id=" + response.data.id;
    })
    .catch(err => {
      console.log(err);
    });
}

/*
 *  Takes an event object (e).
 *  Makes sure the poster URL input and the image being displayed are the same.
 *  Returns nothing.
 */
function updatePoster(e) {
  const poster = document.querySelector("img.poster");
  const posterURL = poster.getAttribute("src");
  const inputURL = e.target.value;

  if (posterURL !== inputURL) {
    poster.setAttribute("src", inputURL);
  }
}

function deleteHandler(e) {
  const id = e.target.getAttribute("data-id");

  console.log(e.target);

  axios.delete(server + "/movies/" + id)
  .then(response => {
    // redraw page
    buildMovieIndex();
  })
  .catch(err => {
    console.log(err);
  });
}

module.exports = { cancelHandler, editHandler, updateHandler, updatePoster, newMovieHandler, deleteHandler };
