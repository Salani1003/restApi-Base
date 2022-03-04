const {response} = require("express");
const {Producto} = require("../models");
const {findOne, findById} = require("../models/categoria");

const obtenerProductos = async (req, res = response) => {
  const {limite = 5, desde = 0} = req.query;

  const [total, productos] = await Promise.all([
    Producto.countDocuments({estado: true}),
    Producto.find({estado: true})
      .limit(Number(limite))
      .skip(Number(desde))
      .populate("usuario", "nombre")
      .populate("categoria", "nombre"),
  ]);
  res.json({
    total,
    productos,
  });
};

const obtenerProducto = async (req, res = response) => {
  const {id} = req.params;
  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json({
    producto,
  });
};
/*const crearProducto = async (req, res = response) => {
  const {estado, usuario, nombre, ...body} = req.body;
  const nombreC = req.body.nombre.toUpperCase();

  const productoDB = await Producto.findOne({nombre:nombreC});
  if (!productoDB || !productoDB.estado) {
    const data = {
      ...body,
      nombre: nombreC,
      usuario: req.userAuth._id,
    };

    const producto = new Producto(data);
    await producto.save();
    res.status(201).json(producto);
  }
  return res.status(400).json({
    msg: `El producto ${productoDB.nombre} ya existe`,
  });
};*/ //PUEDO HACER EL CREAR ASI PARA PODER DAR DE ALTA OBJETOS QUE YA ESTABAN EN LA BASE DE DATOS PERO CON ESTADO EN FALSE
const crearProducto = async (req, res = response) => {
  const {estado, usuario, nombre, ...body} = req.body;

  const nombreC = req.body.nombre.toUpperCase();

  const productoDB = await Producto.findOne({nombre: nombreC});

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe`,
    });
  }
  const data = {
    ...body,
    nombre: nombreC,
    usuario: req.userAuth._id,
  };

  const producto = new Producto(data);
  await producto.save();
  res.status(201).json(producto);
};

const actualizarProducto = async (req, res = response) => {
  const {id} = req.params;
  const {estado, usuario, nombre, ...body} = req.body;
  const nombreC = req.body.nombre.toUpperCase();
  const data = {
    ...body,
    nombre: nombreC,
    usuario: req.userAuth._id,
  };
  const producto = await Producto.findByIdAndUpdate(id, data, {new: true});
  res.json({
    producto,
  });
};

const borrarProducto = async (req, res = response) => {
  const {id} = req.params;

  const producto = await Producto.findByIdAndUpdate(
    id,
    {estado: false},
    {new: true}
  );
  console.log(req.userAuth.rol);
  res.json({
    producto,
  });
};
module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
};
