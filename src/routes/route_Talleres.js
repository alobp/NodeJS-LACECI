const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const mid_AuthToken = require('../middleware/mid_AuthToken');
const ctrl_Talleres = require('../controllers/ctrl_Talleres');

// URL: api/taller

// 1) Consultar los Registros
router.get('/', mid_AuthToken, ctrl_Talleres.readTaller);

// 2) Crear un Registro
router.post(
  '/',
  // nota que primero va el middleware, justo despues de la entrada '/' para asi ejecutar primero la validacion del token de usuario
  mid_AuthToken,
  [
    check('titulo', 'Campo titulo obligatorio').not().isEmpty(),
    check('autor', 'Campo autor obligatorio').not().isEmpty(),
    check('carrera', 'Campo carrera obligatorio').not().isEmpty(),
    check('fecha', 'Campo fecha obligatorio, su formato es: AAAA-MM-DD').isDate(),
    check('pdf_dir', 'Campo pdf_dir obligatorio').not().isEmpty(),
  ],
  ctrl_Talleres.creaTetaller
);

// 3) Actualiza Registro
router.put(
  '/:id',
  mid_AuthToken,
  [
    // optional({ checkFalsy: true, nullable: true})
    check('titulo', 'Campo titulo obligatorio').optional().not().isEmpty(),
    check('autor', 'Campo autor obligatorio').optional().not().isEmpty(),
    check('carrera', 'Campo carrera obligatorio').optional().not().isEmpty(),
    check('fecha', 'Campo fecha obligatorio, su formato es: AAAA-MM-DD')
      .optional()
      .isDate(),
    check('pdf_dir', 'Campo pdf_dir obligatorio').optional().not().isEmpty(),
  ],
  ctrl_Talleres.updateTaller
);

// 4) Eliminar Registro
router.delete('/:id', mid_AuthToken, ctrl_Talleres.deletTaller);

// exportar los enpoints
module.exports = router;
