// Este middleware autentifica al Usaurio por medio de los JWT
// para que ninguna peticion HTTP pase sin ser verificado
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1) leer el token del header
  const token = req.header('x-auth-token');

  // 2) revisar si no hay token
  if (!token) {
    return res.status(401).json({ msj: 'ERROR: No hay token, permiso denegado' });
  }

  // 3) validar el token
  try {
    const cifrado = jwt.verify(token, process.env.JWT_SECRET);
    // si se ha verificado y no salto el CATCH agregamos al request
    req.usuario = cifrado.usuario;
    // si todo sale bien, rediriginmos al siguiente MIDDLEWARE,
    // en este caso, continua con la peticion al controlador del endpoint
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ msj: 'ERROR: Token invalido' });
  }
};
