const {response, request} = require("express");

const userGet = (req = request, res = response) => {
  const {nombre = "No name", apellido} = req.query;
  res.json({
    peticion: "get controller",
    nombre,
    apellido,
  });
};
const userPost = (req = request, res = response) => {
  const {nombre, edad} = req.body;
  res.json({
    peticion: "post controller",
    nombre,
    edad,
  });
};

const userDelete = (req, res = response) => {
  const {id} = req.params;
  res.json({
    peticion: "delete controller",
    id,
  });
};

const userPut = (req, res = response) => {
  const {id} = req.params;
  res.json({
    peticion: "put controller",
    id,
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
