const {Schema, model} = require("mongoose");

const ProductoShema = Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  estado: {
    type: Boolean,
    default: true,
    require: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  descripcion: {
    type: String,
    default: "",
  },
  img: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
});
ProductoShema.methods.toJSON = function () {
  const {__v, estado, ...data} = this.toObject();
  return data;
};

module.exports = model("Producto", ProductoShema);
