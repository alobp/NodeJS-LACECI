// Controlador de los metodos POST
const mod_Eventos = require('../models/mod_Eventos');
const { validationResult } = require('express-validator');

// 1) Crea Nuevo Registro
exports.createEvento = async (req, res) => {
  // 0) verificar si no hay errores en el express-validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    // 1) crear el nuevo registro
    evento = await new mod_Eventos(req.body);

    //2) y guardar registro
    evento.creador = req.usuario.id;
    await evento.save();
    res.status(200).json(evento);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'ERROR: No se creo el evento' });
  }
};

// 2) Consultar Registros
exports.readEvento = async (req, res) => {
  try {
    const eventos = await mod_Eventos
      .find({ creador: req.usuario.id })
      .sort({ titulo: -1 });
    res.status(200).json(eventos);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'ERROR: Hubo un error' });
  }
};

// 3) Actualizar registro
exports.updateEvento = async (req, res) => {
  // verificar si no hay errores en el express-validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // extraer la info del proyecto
  const { titulo, fecha_ini, fecha_fin, enlace_conferencia, texto, imagen } = req.body;
  const evento_update = {};
  if (titulo) evento_update.titulo = titulo;
  if (fecha_ini) evento_update.fecha_ini = fecha_ini;
  if (fecha_fin) evento_update.fecha_fin = fecha_fin;
  if (enlace_conferencia) evento_update.enlace_conferencia = enlace_conferencia;
  if (texto) evento_update.texto = texto;
  if (imagen) evento_update.imagen = imagen;

  try {
    // 1) revisar el ID
    console.log(req.params.id);
    const registro = await mod_Eventos.findById(req.params.id);

    // 2) revisar exista el rigistro
    if (registro) {
      // 3) verificar el creador
      if (registro.creador.toString() === req.usuario.id) {
        // 4) actuaalizar
        const resultado = await mod_Eventos.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: evento_update },
          { new: true }
        );

        // regresar respuesta de exito
        res.status(200).json(resultado);
      } else {
        return res.status(401).json({ error: 'ERROR: No autorizado' });
      }
    } else {
      return res.status(401).json({ error: 'ERROR: No hay registro' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'ERROR: Hubo un error' });
  }
};

exports.deletEvento = async (req, res) => {
  try {
    // 1) revisar el ID
    const id_delet = req.params.id;
    const registro = await mod_Eventos.findById(id_delet);

    // 2) revisar exista el rigistro
    if (registro) {

      // 3) como existe, podemos verificar el creador
      if (registro.creador.toString() === req.usuario.id) {
        // 4) actuaalizar
        const resultado = await mod_Eventos.findOneAndRemove({_id: id_delet});

        // regresar respuesta de exito
        console.log(resultado);
        res.status(200).json('Proyecto Eliminado');
      } else {
        return res.status(401).json({ error: 'ERROR: No autorizado' });
      }
    } else {
      return res.status(401).json({ error: 'ERROR: No existe el registro' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'ERROR: Hubo un error' });
  }
};
