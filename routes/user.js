const {Router} = require("express");
const {check} = require("express-validator");
const {userGet, userPost, userPut, userDelete} = require("../controllers/user");
const {
  esRolValido,
  esEmailExistente,
  existeUsuarioPorID,
  estadoUsuario,
} = require("../helpers/db-validators");
const {
  validarCampos,
  validarJWT,
  esAdminRol,
  tieneRol,
} = require("../middlewares");

const router = Router();

router.get("/", userGet);
router.put(
  "/:id",
  [
    check("id", "El ID ingresado no es valido").isMongoId(),
    check("id").custom(estadoUsuario),
    check("id").custom(existeUsuarioPorID),
    check("rol").custom(esRolValido),
    validarCampos,
  ],

  userPut
);
router.post(
  "/",
  [
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(esEmailExistente),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener mas de 6 caracteres").isLength({
      min: 6,
    }),
    check("rol").custom(esRolValido), // tambien podria poner .custom((rol)=> esRolValido(rol)) pero como el primer argumento es el mismo argumento que se manda a la funcion se omite, entonces el argumento que este recibiendo el custom se envia la funcion
    validarCampos,
  ],
  userPost
);
router.delete(
  "/:id",
  [
    validarJWT,
    //esAdminRol,
    tieneRol("ADMIN_ROL", "VENTAS_ROLE"),
    check("id", "El ID ingresado no es valido").isMongoId(),
    check("id").custom(estadoUsuario),
    check("id").custom(existeUsuarioPorID),
    validarCampos,
  ],
  userDelete
);

module.exports = router;
