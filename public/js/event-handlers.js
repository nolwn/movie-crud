const axios = require("axios");

const server = "https://the-online-movie-database.herokuapp.com";

/*
 *  Takes and event object (e).
 *  Takes the user to the movie page.
 *  Returns nothing.
 */
function cancelHandler(e) {
  const id = e.target.getAttribute("data_id");
  location.href = "/movie.html?id=" + id;
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

/*
 *  Takes an event object (e).
 *  Submits the entry to the movie server.
 *  Returns nothing.
 */
function updateHandler(e) {
  const inputs = document.querySelectorAll("input[type=\'text\']").entries();
  const values = {};
  const id = e.target.getAttribute("data_id");

  for ([ index, input ] of inputs) {
    let field = input.getAttribute("name");
    values[field] = input.value;
  }

  axios.patch(server + "/movies/" + id, values)
  .then(response => {
    if (response.data.error) {
      window.location.href = "/movie.html?id=" + id
    }

    else {

    }
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
  const id = e.target.getAttribute("data_id");

  axios.delete(server + "/movies/" + id)
  .then(response => {
    // redraw page
  })
  .catch(err => {
    console.log(err);
  });
}

module.exports = { cancelHandler, editHandler, updateHandler, updatePoster };
