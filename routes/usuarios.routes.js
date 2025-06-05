const express = require('express');
const router = express.Router();
const { getUsuarios } = require('../controllers/usuarios.controller');
const verificarToken = require('../middlewares/auth.middleware');
const soloRol = require('../middlewares/rol.middleware');

router.get('/', verificarToken, soloRol('admin'), getUsuarios);

module.exports = router;