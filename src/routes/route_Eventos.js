const express = require('express');
const router = express.Router();
const ctrl_Eventos = require('../controllers/ctrl_Eventos');
const { check } = require('express-validator');
// el middleare
const mid_AuthToken = require('../middleware/mid_AuthToken');

// ruta general
// api/eventos

// regresame los registros de un usuario
router.get('/', mid_AuthToken, ctrl_Eventos.readEvento);
// crear un Eventos
router.post(
  '/',
  // nota que primero va el middleware, justo despues de la entrada '/' para asi ejecutar primero la validacion del token de usuario
  mid_AuthToken,
  [
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('fecha_ini', 'Formato de fecha incorrecto (AAAA-MM-DD)').isDate(),
    check('fecha_fin', 'Formato de fecha incorrecto (AAAA-MM-DD)').isDate(),
    check('enlace_conferencia', 'El enlace de la conferencia es obligatorio').isURL(),
    check('texto', 'El texto informativo es obligatorio').not().isEmpty(),
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
  ],
  ctrl_Eventos.createEvento
);
// actualiza registro
router.put(
  '/:id',
  mid_AuthToken,
  [
    // optional({ checkFalsy: true, nullable: true})
    check('titulo', 'El titulo es obligatorio').optional().not().isEmpty(),
    check('fecha_ini', 'Formato de fecha incorrecto (AAAA-MM-DD)').optional().isDate(),
    check('fecha_fin', 'Formato de fecha incorrecto (AAAA-MM-DD)').optional().isDate(),
    check('enlace_conferencia', 'El enlace de la conferencia es obligatorio')
      .optional()
      .isURL(),
    check('texto', 'El texto informativo es obligatorio').optional().not().isEmpty(),
    check('imagen', 'La imagen es obligatoria').optional().not().isEmpty(),
  ],
  ctrl_Eventos.updateEvento
);

router.delete('/:id', mid_AuthToken, ctrl_Eventos.deletEvento);

module.exports = router;
