
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
        {
          id: 1,
          title: "Raising Arizona",
          director: "Joel Coen",
          year: 1987,
          poster_url: "https://upload.wikimedia.org/wikipedia/en/3/31/Raising-Arizona-Poster.jpg",
          rating : 4
        },
        {
          id: 2,
          title: "Fear and Loathing in Las Vegas",
          director: "Terry Gillium",
          year: 1998,
          poster_url: "https://upload.wikimedia.org/wikipedia/en/6/6f/FandlinLV.jpg",
          rating : 3
        },
        {
          id: 3,
          title: "Star Wars",
          director: "George Lucas",
          year: 1977,
          poster_url: "https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg",
          rating : 5
        },
        {
          id: 4,
          title: "The Departed",
          director: "Martin Scorsese",
          year: 2006,
          poster_url: "https://upload.wikimedia.org/wikipedia/en/5/50/Departed234.jpg",
          rating: 2
        }
      ]);
    })
    .then(function () {
      return knex.raw(`SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies));`);
    });
};
