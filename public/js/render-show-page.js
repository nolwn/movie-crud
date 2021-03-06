const handlers = require("./event-handlers");

/*
 *  Takes an object, movie and a boolean, edit.
 *  Inserts the elements directly into the DOM.
 *  No return.
 */
function renderShowPage(movie, edit, newMovie) {

  // Find the anchor on the page and generate the grid for it
  const movieArea = document.getElementById("movie-area");
  const gridX = generateGrid();

  // Cell for the poster image and the poster image itself
  const posterCell = document.createElement("div");
  const posterImg = document.createElement("img");

  // Cell for the movie info and its various elements
  const infoCell = document.createElement("div");
  const fields = ["title", "poster_url", "director", "year", "rating"];
  const data = generateDataElements(fields, edit);
  const id = movie ? movie.id : undefined;
  const buttons = generateButtons(edit, newMovie, id);

  // Configure poster cell
  posterCell.classList.add("cell");
  posterCell.classList.add("large-4");
  posterCell.classList.add("medium-12");


  posterImg.classList.add("poster");

  // Add the poster image to the poster cell
  posterCell.appendChild(posterImg);

  // Configure info cell
  infoCell.classList.add("cell");
  infoCell.classList.add("large-8");
  infoCell.classList.add("medium-12");

  fillInputValues(movie, data, fields.slice(1), edit);
  if (movie) {

    // Configure the poster image
    posterImg.setAttribute("src", movie.poster_url);
    posterImg.setAttribute("alt", movie.title + " poster");

    // Configure title
    if (edit) {
      data.title.value = movie.title;
    }

    else {
      data.title.innerText = movie.title;
    }
  }


  for (let field of fields) {
    infoCell.appendChild(data[field]);
  }

  posterCell.appendChild(buttons);

  // Add cells to grid-x element
  gridX.appendChild(infoCell);
  gridX.appendChild(posterCell);

  movieArea.appendChild(gridX);
}

/*
 *  Takes an array, properties, and a boolean, edit.
 *  Generates and object full of html elements named for the properties based on
 *  wehther they should be editable.
 *  Returns the object.
 */
function generateDataElements(properties, edit) {
  const data = {};

  if (edit) {
    for (property of properties) {
      let input = data[property]
      data[property] = document.createElement("input");
      data[property].setAttribute("placeholder", property);
      data[property].setAttribute("name", property);
      data[property].setAttribute("type", "text");
    }

    data.title.classList.add("title-input");
    data.poster_url.addEventListener("blur", handlers.updatePoster);
  }

  else {
    for(property of properties) {
      if (property === "title") {
        data.title = document.createElement("h2");
      }

      else {
        data[property] = document.createElement("span");
      }
    }
  }

  return data;
}

/*
 *  Takes and object (movie), an object (data), an array (properites) and a
 *  boolean (edit).
 *  Adds movies values into either the data's `value` of `innerText` based on
 *  whether it's editable.
 *  No return.
 */
function fillInputValues(movie, data, properties, edit) {

  // Run through the properties array and generate labels from each property
  for (let property of properties) {
    let label = document.createElement("label");

    data[property].classList.add("datum");

    // if edit set the value, else set the innerText
    if (edit && movie) {
      data[property].value = movie[property];
    }

    else if (movie) {
      data[property].innerText = movie[property];
    }

    /*
     *  Pop the data property into the label, and then make the data property
     *  point to the label rather than the data.
     */
    label.innerText = property.charAt(0).toUpperCase() + property.slice(1);
    label.appendChild(data[property]);
    data[property] = label;

    // if not editable, make sure the poster URL doesn't show up
    if (!edit) {
      data.poster_url.style.display = "none";
    }
  }
}

function generateButtons(edit, newMovie, id) {
  const buttons = document.createElement("div");

  if (edit) {
    const cancel = document.createElement("button");
    const submit = document.createElement("button");
    // Submit first because it floats left first, and so will be on the right
    submit.innerText = "Submit";
    submit.classList.add("button");
    submit.classList.add("movie-button");

    if (id) {
      submit.setAttribute("data_id", id);
      submit.addEventListener("click", handlers.updateHandler);
    } else {
      submit.addEventListener("click", handlers.newMovieHandler);
    }

    buttons.appendChild(submit);

    cancel.innerText = "Cancel";
    cancel.classList.add("button");
    cancel.classList.add("movie-button");
    cancel.setAttribute("data_id", id);
    cancel.addEventListener("click", handlers.cancelHandler);

    buttons.appendChild(cancel);

  }

  else {
    const edit = document.createElement("button");

    edit.innerText = "Edit";

    edit.classList.add("button");
    edit.classList.add("movie-button");

    edit.setAttribute("data_id", id);

    edit.addEventListener("click", handlers.editHandler);

    buttons.appendChild(edit);
  }

  return buttons;
}

/*
 *  Takes nothing.
 *  Creates and configures the grid row for the movie info on the page.
 *  Returns the created html object.
 */
function generateGrid() {

  // grid-x element for holding cells
  const gridX = document.createElement("div");

  // Configure the grid-x element
  gridX.classList.add("grid-x");
  gridX.classList.add("grid-margin-y");
  gridX.classList.add("grid-margin-x");
  gridX.classList.add("grid-padding-x");

  return gridX
}

module.exports = renderShowPage;
