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
 *  Takes and event object (e).
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

  console.log(values);
  axios.patch(server + "/movies/" + id, values)
  .then(data => {
    window.location.href = "/movie.html?id=" + id
  })
  .catch(err => {
    console.log(err.data);
  });
}

module.exports = { cancelHandler, editHandler, updateHandler };
