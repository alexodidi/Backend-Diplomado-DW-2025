const Usuario = require('../models/Usuario');

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find().select('-contraseña');
  res.json(usuarios);
};

module.exports = { getUsuarios };
