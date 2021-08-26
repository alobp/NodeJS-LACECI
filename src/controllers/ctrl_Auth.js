// Controlador de los metodos POST
const bcryptjs = require('bcryptjs');
const UsuariosModel = require('../models/mod_Usuarios');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const mod_Usuarios = require('../models/mod_Usuarios');

exports.autenticarUsuario = async (req, res) => {
  // 0) verificar si no hay errores en el express-validator
  const errores = validationResult(req);
  // si no esta vacio, hay errores
  if (!errores.isEmpty()) {
    console.log(errores.array()[0]);

    return res.status(400).json({ errores: errores.array() });
  }

  // extraemos los campos del cliente
  const { email, password } = req.body;

  try {
    // 1) revisar exista el usuario
    let usuario = await UsuariosModel.findOne({ email });
    if (usuario) {
      // 2) revisar el password
      const pass_correcto = await bcryptjs.compare(password, usuario.password);
      if (pass_correcto) {
        // 3) si todo es ccorrecto, Crear y firmar el JWT
        const payload = {
          usuario: {
            id: usuario.id,
          },
        };
        // firmar el JWT
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 12 * 60 * 60, // 12 hr
          },
          (error, token) => {
            if (!error) {
              // responder peticion
              res.status(200).json({token});
            } else {
              throw error;
            }
          }
        );
      } else {
        res.status(400).send('ERROR: El password es incorrecto');
      }
    } else {
      res.status(400).send('ERROR: El usuario no existe');
    }
  } catch (e) {
    console.log(e);
  }
};


// 2) Obtiene los datos del usuario que esta auttenticado 
exports.usuarioAutenticado = async (req, res) => {
  try {
    // hacemos la busqueda del usuario, menos su password por motivos de seguridad ya no es requerido en el front
    const usuario = await mod_Usuarios.findById(req.usuario.id).select('-password');
    res.json({usuario});
  } catch (error) {
    console.log(error);
    res.status(500).send('ERROR: 901');
  }
}