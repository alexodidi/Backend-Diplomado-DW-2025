const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// Generar token
const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario._id, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
};

// Registro
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    // Validar existencia
    const existe = await Usuario.findOne({ correo });
    if (existe) return res.status(400).json({ error: 'Correo ya registrado' });

    const nuevoUsuario = new Usuario({ nombre, correo, contraseña, rol });
    await nuevoUsuario.save();

    const token = generarToken(nuevoUsuario);
    res.status(201).json({ usuario: nuevoUsuario, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const valido = await usuario.compararPassword(contraseña);
    if (!valido) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = generarToken(usuario);
    res.json({ usuario, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registrarUsuario, login };