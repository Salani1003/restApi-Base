const {request, response} = require("express");
const esAdminRol = (req, res, next) => {
  if (!req.userAuth) {
    return res.status(500).json({
      msg: "Se desea verificar el rol sin validar el token primero",
    });
  }
  const {rol, nombre} = req.userAuth;

  if (rol !== "ADMIN_ROL") {
    return res.status(401).json({
      msg: `${nombre} no puede hacer esto ya que no es un administrador`,
    });
  }
  next();
};

const tieneRol = (...roles) => {
  return (req, res, next) => {
    if (!req.userAuth) {
      return res.status(500).json({
        msg: "Se desea verificar el rol sin validar el token primero",
      });
    }
    if (!roles.includes(req.userAuth.rol)) {
      res.status(401).json({
        msg: "Su rol no le permite hacer esta operacion",
      });
    }
    next();
  };
};

module.exports = {esAdminRol, tieneRol};
