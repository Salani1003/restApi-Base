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

const existeUsuarioPorID = async id => {
  const existeEmail = await User.findById(id);
  if (!existeEmail) {
    throw new Error(`El ID ${id} no existe`);
  }
};
module.exports = {
  esRolValido,
  esEmailExistente,
  existeUsuarioPorID,
};
