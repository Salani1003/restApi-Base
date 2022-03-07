const dbValidators = require("./db-validators");
const generarJWT = require("./generarJWT");
const googleVerify = require("./google-Verify");
const subirArchivos = require("./subir-archivos");

module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...googleVerify,
  ...subirArchivos,
};
