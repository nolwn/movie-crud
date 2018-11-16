
exports.seed = function(knex, Promise) {
  return knex('movies').del();
};
