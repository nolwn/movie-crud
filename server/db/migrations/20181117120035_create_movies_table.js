exports.up = function(knex, Promise) {
  return knex.schema.createTable("movies", (table) => {
    table.increments();
    table.string("title")
      .notNullable();
    table.string("director")
      .notNullable();
    table.integer("year")
      .notNullable();
    table.text("poster_url");
    table.integer("rating");
    table.timestamps(true, true);
  })
  .then(() => {
    return knex.schema.raw(
      `ALTER TABLE movies
         ADD CHECK (rating < 6 AND rating > 0);`
  );
  })
  .then(() => {
    return knex.schema.raw(
      `ALTER TABLE movies
         ADD CHECK (year < 3000 AND year > 1920);`
    );
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("movies");
};
