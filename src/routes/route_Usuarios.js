const express = require('express');
const router = express.Router();
const usuariosCtrl = require('../controllers/ctrl_Usuarios');
const { check } = require('express-validator');

// retua general
// api/usuarios

// crear un usuario
router.post('/', [
  check('nombre',   'El nombre es obligatorio').not().isEmpty(),
  check('email',    'Agrega un email valido').isEmail(),
  check('password', 'El password debe tener al menos 6 caracteres').isLength({min:6})
], usuariosCtrl.createUsuario);

module.exports = router;
