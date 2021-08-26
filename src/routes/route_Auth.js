const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authCtrl = require('../controllers/ctrl_Auth');
const mid_AuthToken = require('../middleware/mid_AuthToken');

// 1) Iniciar sesion (verificar usuario)
// api/auth
router.post(
  '/',
  // -----------------------------------------------------------------------
  // NOTA: Quitamos la validacion de los campos de loguin ya que la hacemos con el controlador,
  // al verificar si el usuario existe o no existe con los datos apsados desde el front.
  // -----------------------------------------------------------------------
  // [
  //   check('email', 'Agrega un email valido').isEmail(),
  //   check('password', 'El password debe tener al menos 6 caracteres').isLength({
  //     min: 6,
  //   }),
  // ],
  authCtrl.autenticarUsuario
);

// 2) Obtener al usuario autenticado
router.get('/', mid_AuthToken, authCtrl.usuarioAutenticado);

// -----------------------------
module.exports = router;
