
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
        {id: 1, title: 'Raising Arizona', director: "Joel Coen", year: 1987, poster_url: "http://placeholder.com/50x90.png", rating : 4}
      ]);
    })
    .then(function () {
      return knex.raw(`SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies));`);
    });
};
