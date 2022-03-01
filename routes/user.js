const {Router} = require("express");
const {check} = require("express-validator");
const {userGet, userPost, userPut, userDelete} = require("../controllers/user");
const {
  esRolValido,
  esEmailExistente,
  existeUsuarioPorID,
} = require("../helpers/db-validators");
/* const {validarCampos} = require("../middlewares/validar-campos");
const {esAdminRol, tieneRol} = require("../middlewares/validar-roles");
const {validarJWT} = require("../middlewares/validarJWT"); */
const {
  validarCampos,
  validarJWT,
  esAdminRol,
  tieneRol,
} = require("../middlewares");
const {validarPost} = require("../middlewares/validarUsers");
const router = Router();

router.get("/", userGet);
router.put(
  "/:id",
  [
    check("id", "El ID ingresado no es valido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    check("rol").custom(esRolValido),
    validarCampos,
  ],

  userPut
);
router.post("/", validarPost, userPost);
router.delete(
  "/:id",
  [
    validarJWT,
    //esAdminRol,
    tieneRol("ADMIN_ROL", "VENTAS_ROLE"),
    check("id", "El ID ingresado no es valido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    validarCampos,
  ],
  userDelete
);

module.exports = router;
