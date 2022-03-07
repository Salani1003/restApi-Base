const {response} = require("express");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const path = require("path");
const {subirArchivo} = require("../helpers");
const {User, Producto} = require("../models");

cloudinary.config(process.env.CLOUDINARY_URL);

const cargarArchivo = async (req, res = response) => {
  try {
    //en caso de no querer ocupar un argumento, envio undefined en el lugar del argumento
    const nombre = await subirArchivo(req.files, undefined, "imagenes");

    res.json({nombre});
  } catch (msg) {
    res.status(400).json({msg});
  }
};

const actualizarImagenes = async (req, res = response) => {
  const {id, coleccion} = req.params;
  let modelo;

  switch (coleccion) {
    case "users":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: `No esta implementado la subida de imagenes para esa coleccion`,
      });
  }

  //limpiar imagenes previas
  if (modelo.img) {
    //hay que borrar la imagen
    const pathImg = path.join(__dirname, "../uploads", coleccion, modelo.img);
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg);
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);

  modelo.img = nombre;
  await modelo.save();
  res.json(modelo);
};
const actualizarImagenesCloudinary = async (req, res = response) => {
  const {id, coleccion} = req.params;
  let modelo;

  switch (coleccion) {
    case "users":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: `No esta implementado la subida de imagenes para esa coleccion`,
      });
  }

  //limpiar imagenes previas
  if (modelo.img) {
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);
  }

  try {
    const {tempFilePath} = req.files.archivo;

    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);
  } catch (error) {
    res.status(500).json({error});
  }
};

const mostrarImagen = async (req, res = response) => {
  const {id, coleccion} = req.params;
  let modelo;

  switch (coleccion) {
    case "users":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: `No esta implementado la subida de imagenes para esa coleccion`,
      });
  }

  //limpiar imagenes previas
  if (modelo.img) {
    //hay que borrar la imagen
    const pathImg = path.join(__dirname, "../uploads", coleccion, modelo.img);
    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg);
    }
  }

  const pathPlaceholder = path.join(__dirname, "../assets", "no-image.jpg");
  res.sendFile(pathPlaceholder);
};
module.exports = {
  cargarArchivo,
  actualizarImagenes,
  mostrarImagen,
  actualizarImagenesCloudinary,
};
