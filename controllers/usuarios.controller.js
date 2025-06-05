const Usuario = require('../models/Usuario');

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contraseña');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

module.exports = { getUsuarios };