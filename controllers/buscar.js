const {response} = require("express");
const {ObjectId} = require("mongoose").Types;
const {User, Categoria, Producto} = require("../models");
const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMondoID = ObjectId.isValid(termino);
  if (esMondoID) {
    const usuario = await User.findById(termino);
    return res.json({
      result: usuario ? [usuario] : [],
    });
  }
  const regex = new RegExp(termino, "i"); // hago insensible la busqueda, para tener mejores resultados se lo paso a la busqueda del find
  const usuarios = await User.find({
    $or: [{nombre: regex}, {correo: regex}],
    $and: [{estado: true}],
  });
  return res.json({
    result: usuarios,
  });
};
const buscarCategoria = async (termino = "", res = response) => {
  const esMondoID = ObjectId.isValid(termino);
  if (esMondoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      result: categoria ? [categoria] : [],
    });
  }
  const regex = new RegExp(termino, "i"); // hago insensible la busqueda, para tener mejores resultados se lo paso a la busqueda del find
  const categorias = await Categoria.find({nombre: regex, estado: true});
  return res.json({
    result: categorias,
  });
};
const buscarProductos = async (termino = "", res = response) => {
  const esMondoID = ObjectId.isValid(termino);
  if (esMondoID) {
    const producto = await Producto.findById(termino);
    return res.json({
      result: producto ? [producto] : [],
    });
  }
  const regex = new RegExp(termino, "i"); // hago insensible la busqueda, para tener mejores resultados se lo paso a la busqueda del find
  const productos = await Producto.find({nombre: regex, estado: true});
  return res.json({
    result: productos,
  });
};

const buscar = async (req, res = response) => {
  const {coleccion, termino} = req.params;
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategoria(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: `Falta hacer esta busqueda.`,
      });
  }
};

module.exports = {
  buscar,
};
