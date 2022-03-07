const res = require("express/lib/response");
const {Categoria, Producto} = require("../models");
const Role = require("../models/rol");
const User = require("../models/user");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({rol});
  if (!existeRol) {
    throw new Error(`El rol ${rol} no es un rol permitido`);
  }
};

const esEmailExistente = async (correo = "") => {
  const existeEmail = await User.findOne({correo});
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};

const existeUsuarioPorID = async (id) => {
  const existeUsuario = await User.findById(id);

  if (!existeUsuario) {
    throw new Error(`El ID ${id} no existe`);
  }
};
const estadoUsuario = async (id) => {
  const estadoUsuario = await User.findById(id);
  if (!estadoUsuario.estado) {
    throw new Error(`El usuario fue dado de baja`);
  }
};

const existeCategoriaPorID = async (id) => {
  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    throw new Error(`Categoria con ID:  ${id} no existe`);
  }
};
const estadoCategoria = async (id) => {
  const estadoCategoria = await Categoria.findById(id);
  if (!estadoCategoria.estado) {
    throw new Error(`La categoria fue dada de baja`);
  }
};

const existeProductoPorID = async (id) => {
  const existeProducto = await Producto.findById(id);

  if (!existeProducto) {
    throw new Error(`Producto con ID:  ${id} no existe`);
  }
};
const estadoProducto = async (id) => {
  const estadoProducto = await Producto.findById(id);
  if (!estadoProducto.estado) {
    throw new Error(`El producto fue dado de baja`);
  }
};

const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(
      `La coleccion ${coleccion} no esta permitida, Pruebe con :${colecciones}`
    );
  }
  return true;
};
module.exports = {
  esRolValido,
  esEmailExistente,
  existeCategoriaPorID,
  existeUsuarioPorID,
  existeProductoPorID,
  estadoProducto,
  estadoCategoria,
  estadoUsuario,
  coleccionesPermitidas,
};
