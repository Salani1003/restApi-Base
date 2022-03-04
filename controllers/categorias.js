const {response} = require("express");
const {Categoria, User} = require("../models");

const obtenerCategorias = async (req, res = response) => {
  const {limite = 5, desde = 0} = req.query;

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments({estado: true}),
    Categoria.find({estado: true})
      .limit(Number(limite))
      .skip(Number(desde))
      .populate("usuario", "nombre"),
  ]);
  res.json({
    total,
    categorias,
  });
};

const obtenerCategoria = async (req, res = response) => {
  const {id} = req.params;
  const categoria = await Categoria.findById(id).populate("usuario", "nombre");
  res.json({
    categoria,
  });
};
const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({nombre});

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe`,
    });
  }

  const data = {
    nombre,
    usuario: req.userAuth._id, // esto viene desde la funcion validarJWT seteamos la req
  };

  const categoria = new Categoria(data);
  //guardar en db
  await categoria.save();
  res.status(201).json(categoria);
};
const actualizarCategoria = async (req, res = response) => {
  const {id} = req.params;
  const nombre = req.body.nombre.toUpperCase();

  const data = {
    nombre,
    usuario: req.userAuth._id, // esto viene desde la funcion validarJWT seteamos la req
  };

  const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});
  res.json(categoria);
};

const borrarCategoria = async (req, res = response) => {
  const {id} = req.params;
  const categoria = await Categoria.findByIdAndUpdate(
    id,
    {estado: false},
    {new: true}
  );
  res.json({
    msg: `Categoria eliminada con exito`,
    categoria,
  });
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
