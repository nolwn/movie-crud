/*
 *  Takes an array of movie objects and renders them.
 *  No return.
 */
function renderAllMovies(movies) {
  // Element into which the index will be inserted.
  const movieIndex = document.querySelector("#movie-index");
  console.log(movies);

  // loop over the movies, rendering each one.
  movies.forEach(movie => {
    const movieElemenet = createMovie(movie);
    movieIndex.appendChild(movieElemenet);
  });
}

/*
 *  Takes a single movie object and constructs it as a table row element.
 *  returns HTMLElement.
 */
function createMovie(movie) {
  // Table row, the element that will be returned
  const tableRow = document.createElement("tr");
  const propeties = ["director", "year", "rating"];

  // Makes the first td in the col, the title, bold
  const titleLink = document.createElement("a");
  const title = document.createElement("td");

  // Construct the title and title link
  titleLink.setAttribute("href", `/movie.html?id=${movie.id}`);
  titleLink.innerText = movie.title;
  title.classList.add("column-heading");

  // add the title and title link to the tablerow
  title.appendChild(titleLink);
  tableRow.appendChild(title);

  // Builds a td element for each required property and adds it to the row
  for (property of propeties) {
    let tableData = document.createElement("td");

    tableData.innerText = movie[property];
    tableRow.appendChild(tableData);
  }

  // Appends the "edit" and "delete" buttons
  tableRow.appendChild(createEditButton(movie.id));
  tableRow.appendChild(createDeleteButton(movie.id));


  return tableRow; // The completed row!
}

/*
 *  Takes a single string, id, and builds an edit button for the corresponding
 *  entry.
 *  Returns the button as a td element.
 */
function createEditButton(id) {
  const buttonCell = document.createElement("td"); // td wrapper
  const editButton = document.createElement("a"); // clickable part

  editButton.innerText = "edit";
  editButton.classList.add("table-button");
  editButton.setAttribute("href", "/edit.html?id=" + id);

  buttonCell.appendChild(editButton);

  return buttonCell;
}

/*
 *  Takes a single string, id, and builds a delete button for the corresponding
 *  entry.
 *  Returns the button as a td element.
 */
function createDeleteButton(id) {
  const buttonCell = document.createElement("td");
  const deleteButton = document.createElement("a");

  deleteButton.innerText = "delete";
  deleteButton.classList.add("table-button");

  deleteButton.style.color = "red"; // make the delete button red

  buttonCell.appendChild(deleteButton);

  return buttonCell;
}

module.exports = renderAllMovies;
