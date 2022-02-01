const bcryptjs = require("bcryptjs");
const {request, response} = require("express");
const {generarJWT} = require("../helpers/generarJWT");
const User = require("../models/user");

const login = async (req, res = response) => {
  const {correo, password} = req.body;

  try {
    //1 Verificar si el email existe
    const user = await User.findOne({correo});
    if (!user) {
      return res.status(400).json({
        msg: "Credenciales no validas!!! -- Correo ",
      });
    }
    //2 verificar si el usuario esta activo
    if (!user.estado) {
      return res.status(400).json({
        msg: "Credenciales no validas -- usuario borrado",
      });
    }
    //3 verificar la contraseña
    const validarPassword = bcryptjs.compareSync(password, user.password);
    if (!validarPassword) {
      return res.status(400).json({
        msg: "Credenciales no validas!! - password incorrecto",
      });
    }

    //4 generar JWT
    const token = await generarJWT(user.id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salio mal!",
    });
  }
};

module.exports = {login};
