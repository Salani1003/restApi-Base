const validarCampos = require("../middlewares/validar-campos");
const validarRoles = require("../middlewares/validar-roles");
const validarJWT = require("../middlewares/validarJWT");

module.exports = {
  ...validarJWT,
  ...validarRoles,
  ...validarCampos,
};
