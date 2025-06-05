const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const verificarToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verificar cabecera
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar usuario en BD
    const usuario = await Usuario.findById(decoded.id).select('-contraseña');
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Inyectar usuario en la request
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = verificarToken;
