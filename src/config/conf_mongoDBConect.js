// importamos las variables de entorno
require('dotenv').config({ path: 'variables.env' });
// importamos mongoose
const mongoose = require('mongoose');

// creamos el metodo para conectar  al abase de datos de mongo
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGODB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(' - - Conectado a mongo DB - -');
  } catch (error) {
    console.log(error);
    process.exit(1); // Para detener la app
  }
};

// exportamos nuestra funcion
module.exports = conectarDB;
