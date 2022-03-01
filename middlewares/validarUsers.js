const {check} = require("express-validator");
const {validarCampos} = require(".");
const {esEmailExistente, esRolValido} = require("../helpers/db-validators");

const validarPost = [
  check("correo", "El correo no es valido").isEmail(),
  check("correo").custom(esEmailExistente),
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("password", "El password debe tener mas de 6 caracteres").isLength({
    min: 6,
  }),
  check("rol").custom(esRolValido), // tambien podria poner .custom((rol)=> esRolValido(rol)) pero como el primer argumento es el mismo argumento que se manda a la funcion se omite, entonces el argumento que este recibiendo el custom se envia la funcion
  validarCampos,
];

module.exports = {validarPost};
