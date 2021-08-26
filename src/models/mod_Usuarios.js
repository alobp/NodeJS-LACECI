const mongoose = require('mongoose');

// Forma 1 de crear un schema
// definimos la estructura de la "tabla" con:
const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  foto: {
    type: String,
    require: true,
    trim: true,
  },
  grado_academico: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  fecha: {
    type: Date,
    default: Date.now()
  },
});

// exportamos el modelo para poder usarlo
module.exports = mongoose.model('Usuarios', UsuariosSchema);
