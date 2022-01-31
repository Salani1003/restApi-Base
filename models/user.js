const {Schema, model} = require("mongoose");

const UserSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  correo: {
    type: String,
    required: [true, "El correo electronico es requerido"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La Contraseña es requerido"],
  },
  imagen: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const {__v, password, ...user} = this.toObject();
  return user;
};
module.exports = model("User", UserSchema);
