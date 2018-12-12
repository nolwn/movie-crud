const db = require("../../db");

function getAll() {
  return db("movies");
}

function getOne(id) {
  return db("movies")
    .where({id : id})
    .then(([ data ]) => data);
}

function create(body) {
  return db("movies")
    .insert(body)
    .returning("*")
    .then(([ data ]) => data);
}

function update(id, update) {
  return db("movies")
    .update(update)
    .where({ id : id })
    .returning("*")
    .then(([ data ]) => data);

}

function remove(id) {
  return db("movies")
    .del()
    .where({ id : id })
    .returning("*")
    .then(([ data ]) => data);
}

module.exports = { getAll, getOne, create, update, remove };
