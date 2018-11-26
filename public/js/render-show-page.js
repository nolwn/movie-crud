/*
 *  Takes an object, movie and a boolean, edit.
 *  Inserts the elements directly into the DOM.
 *  No return.
 */
function renderShowPage(movie, edit) {

  // Find the anchor on the page and generate the grid for it
  const movieArea = document.getElementById("movie-area");
  const gridX = generateGrid();

  // Cell for the poster image and the poster image itself
  const posterCell = document.createElement("div");
  const posterImg = document.createElement("img");

  // Cell for the movie info and its various elements
  const infoCell = document.createElement("div");
  const fields = ["title", "director", "year", "rating", "poster_url"];
  const data = generateDataElements(edit ? fields : fields, edit);
  const buttons = generateButtons(edit);

  // Configure poster cell
  posterCell.classList.add("cell");
  posterCell.classList.add("large-4");
  posterCell.classList.add("medium-12");

  // Configure the poster image
  posterImg.setAttribute("src", movie.poster_url);
  posterImg.setAttribute("alt", movie.title + " poster");

  posterImg.classList.add("poster");

  // Add the poster image to the poster cell
  posterCell.appendChild(posterImg);

  // Configure info cell
  infoCell.classList.add("cell");
  infoCell.classList.add("large-8");
  infoCell.classList.add("medium-12");

  fillInputValues(movie, data, fields.slice(1), edit);

  // Configure title
  if (edit) {
    data.title.value = movie.title;
  }

  else {
    data.title.innerText = movie.title;
  }

  for (field of fields) {
    infoCell.appendChild(data[field]);
  }

  infoCell.appendChild(buttons);

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
      data[property] = document.createElement("input");
      data[property].setAttribute("placeholder", property);
    }

    data.title.classList.add("title-input");
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
  for (property of properties) {
    let label = document.createElement("label");

    data[property].classList.add("datum");

    // if edit set the value, else set the innerText
    if (edit) {
      data[property].value = movie[property];
    }

    else {
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

function generateButtons(edit) {
  const buttons = document.createElement("div");

  if (edit) {
    const cancel = document.createElement("button");
    const submit = document.createElement("button");

    // Submit first because it floats left first, and so will be on the right
    submit.innerText = "Submit";
    submit.classList.add("button");
    submit.classList.add("movie-button");
    buttons.appendChild(submit);

    cancel.innerText = "Cancel";
    cancel.classList.add("button");
    cancel.classList.add("movie-button");
    buttons.appendChild(cancel);

  }

  else {
    const edit = document.createElement("button");

    edit.innerText = "Edit";
    edit.classList.add("button");
    edit.classList.add("movie-button");
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
