const {response, request} = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const userGet = async (req = request, res = response) => {
  const {limite = 5, desde = 0} = req.query;

  const [total, users] = await Promise.all([
    User.countDocuments({estado: true}),
    User.find({estado: true}).limit(Number(limite)).skip(Number(desde)),
  ]);
  res.json({
    total,
    users,
  });
};
const userPost = async (req = request, res = response) => {
  const {nombre, correo, password, rol, ...resto} = req.body;
  const user = new User({nombre, correo, password, rol});

  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  //guardar en base de datos
  await user.save();
  res.json({
    peticion: "post controller",
    user,
  });
};

const userDelete = async (req, res = response) => {
  const {id} = req.params;
  const user = await User.findByIdAndUpdate(id, {estado: false}, {new: true});
  res.json({
    user,
  });
};

const userPut = async (req, res = response) => {
  const {id} = req.params;
  const {_id, password, google, correo, ...resto} = req.body;
  //TODO validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, resto, {new: true});
  res.json(user);
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
