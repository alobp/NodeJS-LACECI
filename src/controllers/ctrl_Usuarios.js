// Controlador de los metodos POST
const bcryptjs = require('bcryptjs');
const UsuariosModel = require('../models/mod_Usuarios');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// CRUD -> PGPD
// Create (POST)
// Read   (GET)
// Update (PUT)
// Delet  (DELET)


// 1) Crea Nuevo Registro
exports.createUsuario = async (req, res) => {
  let usuario;
  const { email, password } = req.body;

  // 0) verificar si no hay errores en el express-validator
  const errores = validationResult(req);
  // si no esta vacio, hay errores
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    // 1) verificar que no existe el usuario
    // buscar usuario
    usuario = await UsuariosModel.findOne({ email });
    // verificar
    if (!usuario) {
      // 2) crear el nuevo usuario
      usuario = new UsuariosModel(req.body);

      // 3) hashear el pasword
      const salt = await bcryptjs.genSalt(10);
      // NOTA: salt se usa por si hay usuarios con la misma psw, y lo que hacce es encriptarla de manera diferente
      usuario.password = await bcryptjs.hash(password, salt);

      // 4) y guardar registro
      await usuario.save();

      // 5) Crear y firmar el JWT
      const payload = {
        usuario: {
          id: usuario.id,
        },
      };
      // 5.1) firmar el jwt
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          // 1hr a segundos
          expiresIn: 1 * 60 * 60 ,
        },
        (error, token) => {
          if (error) {
            throw error;
          }
          //
          res.status(200).json({ token: token });
        }
      );

      // ) enviar confirmacion
      // res.send('Usuario creado correctamente');
    } else {
      return res.status(400).send('ERROR: El usuario ya existe');
    }
  } catch (e) {
    console.log(e);
    res.status(400).send('ERROR: No se creo el usuario');
  }
};

exports.readUsuario = (req, res) => {
  console.log('readUsuario');
  console.log(req.body);
};
exports.updateUsuario = (req, res) => {
  console.log('updateUsuario');
  console.log(req.body);
};
exports.deletUsuario = (req, res) => {
  console.log('deletUsuario');
  console.log(req.body);
};
