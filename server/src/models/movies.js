const db = require("../../db");

function getAll() {
  return db("movies");
}

function getOne(id) {
  return db("movies")
    .where({id : id});
}

function create(body) {
  return db("movies")
    .insert(body)
    .returning("*");
}

function update(id, update) {
  return db("movies")
    .update(update)
    .where({ id : id })
    .returning("*");
}

function remove(id) {
  return db("movies")
    .del()
    .where({ id : id })
    .returning("*");
}

module.exports = { getAll, getOne, create, update, remove };
