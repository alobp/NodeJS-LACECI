const mongoose = require('mongoose');

// Forma 2 de crear un schema
// definimos la estructura de la "tabla" con:
const EventosSchema = mongoose.Schema({
  creador:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios'
  },
  titulo: {
    type: String,
    require: true,
    trim: true,
  },
  fecha_ini: {
    type: Date,
    require: true,
  },
  fecha_fin: {
    type: Date,
    require: true,
  },
  enlace_conferencia: {
    type: String,
    require: true,
    trim: true,
  },
  texto: {
    type: String,
    require: true,
    trim: true,
  },
  imagen: {
    type: String,
    require: true,
    trim: true,
  },
});

// exportamos el modelo para poder usarlo
module.exports = mongoose.model('Eventos', EventosSchema);
