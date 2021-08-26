const mongoose = require('mongoose');

// Forma 2 de crear un schema
// definimos la estructura de la "tabla" con:
const TalleresSchema = mongoose.Schema({
  titulo: {
    type: String,
    require: true,
    trim: true,
  },
  autor: {
    type: String,
    require: true,
    trim: true,
  },
  carrera: {
    type: String,
    require: true,
    trim: true,
  },
  fecha: {
    type: Date,
    require: true,
  },
  pdf_dir: {
    type: String,
    require: true,
    trim: true,
  },
  fk_usuario:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios'
  },
});

// exportamos el modelo para poder usarlo
module.exports = mongoose.model('Talleres', TalleresSchema);
