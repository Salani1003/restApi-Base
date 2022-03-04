const {Router} = require("express");
const {check} = require("express-validator");
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");
const {
  existeCategoriaPorID,
  existeProductoPorID,
  estadoProducto,
} = require("../helpers/db-validators");
const {
  validarJWT,
  validarCampos,
  esAdminRol,
  tieneRol,
} = require("../middlewares");

const router = Router();

router.get("/", obtenerProductos);
router.get(
  "/:id",
  [
    check("id", "El ID ingresado no es valido").isMongoId(),
    check("id").custom(estadoProducto),
    check("id").custom(existeProductoPorID),
    validarCampos,
  ],
  obtenerProducto
);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria").custom(existeCategoriaPorID),
    check("categoria", "No es un ID valido de categoria").isMongoId(),
    validarCampos,
  ],
  crearProducto
);
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria").custom(existeCategoriaPorID),
    check("categoria", "No es un ID valido de categoria").isMongoId(),
    check("id", "No es un ID de Producto valido").isMongoId(),
    check("id").custom(estadoProducto),
    check("id").custom(existeProductoPorID),
    validarCampos,
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRol,
    check("id").custom(estadoProducto),
    check("id").custom(existeProductoPorID),
    check("id", "No es un ID de Producto valido").isMongoId(),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
