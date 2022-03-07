const {Router} = require("express");
const {check} = require("express-validator");
const {
  cargarArchivo,
  actualizarImagenes,
  mostrarImagen,
  actualizarImagenesCloudinary,
} = require("../controllers/uploads");
const {coleccionesPermitidas} = require("../helpers");
const {validarArchivo} = require("../middlewares");

const {validarCampos} = require("../middlewares/validar-campos");
const router = Router();

router.post("/", validarArchivo, cargarArchivo);
router.put(
  "/:coleccion/:id",
  [
    validarArchivo,
    check("id", "El ID debe ser un ID mongo valido").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["users", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagenesCloudinary
  /* actualizarImagenes */
);

router.get(
  "/:coleccion/:id",
  [
    check("id", "El ID debe ser un ID mongo valido").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["users", "productos"])
    ),
    validarCampos,
  ],
  mostrarImagen
);
module.exports = router;
