const models = require("../models/movies");

function getAll(req, res, next) {
  models.getAll()
  .then((data) => {
    res.status(200).send(data)
  })
  .catch((err) => {
    next({ status : 404, error : err });
  });
}

function getOne(req, res, next) {
  models.getOne(req.params.id)
  .then((data) => {
    if (data.length < 1)
      throw "No entry found.";
    res.status(200).send(data);
  })
  .catch((err) => {
    next({ status : 404, error : err });
  });
}

function create(req, res, next) {
  models.create(req.body)
  .then((data) => {
    if (data.length < 1)
      throw "Something went wrong.";
    res.status(200).send(data);
  })
  .catch((err) => {
    next({ status : 400, error : err });
  });
}

function update(req, res, next) {
  models.update(req.params.id, req.body)
  .then((data) => {
    if (data.length < 1)
      throw "No entry found.";
    res.status(200).send(data);
  })
  .catch((err) => {
    next({ status : 400, error : err });
  });
}

function remove(req, res, next) {
  models.remove(req.params.id)
  .then((data) => {
    if (data.length < 1)
      throw "No entry found.";
    res.status(200).send(data);
  })
  .catch((err) => {
    next({ status : 400, error : err });
  });
}

module.exports = { getAll, getOne, create, update, remove };
