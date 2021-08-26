// Controlador de los metodos POST
const mod_Talleres = require('../models/mod_Talleres');
const { validationResult } = require('express-validator');

// 1) Crea Nuevo Registro
exports.creaTetaller = async (req, res) => {
  // 1.0) verificar si no hay errores en el express-validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    // 1.1) crear nuevo registro
    taller = await new mod_Talleres(req.body);
    // agregamos su referencia de pertenencia
    taller.fk_usuario = req.usuario.id;
    //1.2) y guardar registro
    await taller.save();
    res.status(200).json(taller);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'ERROR: No se creo el registro' });
  }
};

// 2) Consultar Registros
exports.readTaller = async (req, res) => {
  try {
    // buscar todos los registros del dependiente
    const tallers = await mod_Talleres.find({ fk_usuario: req.usuario.id }); // .sort({ titulo: -1 });
    res.status(200).json(tallers);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'ERROR: No se logro la consulta' });
  }
};

// 3) Actualizar registro
exports.updateTaller = async (req, res) => {
  // console.log(req.params.id);
  const id_update = req.params.id;

  // verificar si no hay errores en el express-validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // extraer la info del proyecto
  const { titulo, autor, carrera, fecha, pdf_dir } = req.body;
  // creamos  un nuevo obj con los datos solo a modificar
  const registro_update = {};
  if (titulo) registro_update.titulo = titulo;
  if (autor) registro_update.autor = autor;
  if (carrera) registro_update.carrera = carrera;
  if (fecha) registro_update.fecha = fecha;
  if (pdf_dir) registro_update.pdf_dir = pdf_dir;

  try {
    // 1) revisar el ID
    const registro = await mod_Talleres.findById(id_update);

    // 2) revisar exista el rigistro
    if (registro) {
      // 3) verificar el creador
      if (registro.fk_usuario.toString() === req.usuario.id) {
        // 4) actuaalizar
        const resultado = await mod_Talleres.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: registro_update },
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
    res.status(500).json({ error: 'ERROR: No existe el registro' });
  }
};

// 4) Eliminar Registro
exports.deletTaller = async (req, res) => {
  try {
    // 1) revisar el ID
    const id_delet = req.params.id;
    const registro = await mod_Talleres.findById(id_delet);

    // 2) revisar exista el rigistro
    if (registro) {
      // 3) como existe, podemos verificar el creador
      if (registro.fk_usuario.toString() === req.usuario.id) {
        // 4) actuaalizar
        const resultado = await mod_Talleres.findOneAndRemove({ _id: id_delet });

        // regresar respuesta de exito
        // console.log(resultado);
        res.status(200).json('Proyecto Eliminado');
      } else {
        return res.status(401).json({ error: 'ERROR: No autorizado' });
      }
    } else {
      return res.status(401).json({ error: 'ERROR: Registro no encontrado' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'ERROR: No existe dicho registro' });
  }
};
