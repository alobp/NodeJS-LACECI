// --------------------------------------
// Este es el archivo principal de la API para el backen de node
// --------------------------------------
console.log('>>>> INICIO de index EXPRESS');

// 1) crear el servidor de EXPRESS
const express = require('express');
const cors = require('cors');
const app = express();

// 6) habilitar cors
app.use(cors());

// 2) defininmos el puerto de la app
const PORT = process.env.PORT || 4000;

// habilitar express.json
// **habilitar JSON en EXPRESS, esto para habilitar los parametros enviados por Headers
app.use(express.json({ extended: true }));

// 3) conectar a mongo DB
const conectarDB = require('./config/conf_mongoDBConect');
conectarDB();

// 4) Definimos el ROUTING de la API
// 5.1) Definir la pagina principal
app.get('/api', (req, res) => res.send('Bienvenido a la API de LACECI'));
// Usuarios
app.use('/api/usuarios', require('./routes/route_Usuarios'));
// autenticacion
app.use('/api/auth', require('./routes/route_Auth'));
// Eventos
app.use('/api/eventos', require('./routes/route_Eventos'));
// Talleres
app.use('/api/taller', require('./routes/route_Talleres'));

// *) Arrancar la app
app.listen(PORT, () => {
  console.log('--------------------------------\n');
  console.log(`\t El servidor esta funcionando en el puerto: ${PORT}`);
  console.log('\n--------------------------------');
});
