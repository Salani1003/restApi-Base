const {Router} = require("express");
const {check} = require("express-validator");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");
const {
  existeCategoriaPorID,
  estadoCategoria,
} = require("../helpers/db-validators");
const {validarJWT, validarCampos, tieneRol} = require("../middlewares");

const router = Router();

router.get("/", obtenerCategorias); //obtener todas las categorias
router.get(
  "/:id",
  [
    check("id", "El ID ingresado no es valido").isMongoId(),
    check("id").custom(estadoCategoria),
    check("id").custom(existeCategoriaPorID),
    validarCampos,
  ],
  obtenerCategoria
); //obtener una categoria por id

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es Obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es Obligatorio").not().isEmpty(),
    check("id", "El ID ingresado no es valido").isMongoId(),
    check("id").custom(estadoCategoria),
    check("id").custom(existeCategoriaPorID),
    validarCampos,
  ],
  actualizarCategoria
); //actualizar un registro por id  privado cualquier con token

router.delete(
  "/:id",

  [
    validarJWT,
    tieneRol("ADMIN_ROL"),
    check("id", "El ID ingresado no es valido").isMongoId(),
    check("id").custom(estadoCategoria),
    check("id").custom(existeCategoriaPorID),
    validarCampos,
  ],
  borrarCategoria
); //borrar una categoria privado solo para los admids role

module.exports = router;
