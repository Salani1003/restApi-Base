const bcryptjs = require("bcryptjs");
const {request, response} = require("express");
const {defaultConfiguration} = require("express/lib/application");
const {json} = require("express/lib/response");
const {DefaultTransporter} = require("google-auth-library");
const {generarJWT} = require("../helpers/generarJWT");
const {googleVerify} = require("../helpers/google-Verify");
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

const googleSingIn = async (req, res = response) => {
  const {id_token} = req.body;
  try {
    const {nombre, img, correo} = await googleVerify(id_token);

    let user = await User.findOne({correo});

    if (!user) {
      //crear el usuario
      const data = {
        nombre,
        img,
        correo,
        password: ":p",
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.estado) {
      return res.status(401).json({
        msg: "Usuario bloqueado, hable con el administrador",
      });
    }

    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "El token no pudo verificarse",
    });
  }
};

module.exports = {login, googleSingIn};
