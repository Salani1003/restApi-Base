const validarCampos = require("../middlewares/validar-campos");
const validarRoles = require("../middlewares/validar-roles");
const validarJWT = require("../middlewares/validarJWT");
const validarArchivo = require("../middlewares/validar-archivos");
module.exports = {
  ...validarJWT,
  ...validarRoles,
  ...validarCampos,
  ...validarArchivo,
};
