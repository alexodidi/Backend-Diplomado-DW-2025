const express = require('express');
const router = express.Router();
const { registrarUsuario, login } = require('../controllers/auth.controller');

const { validarRegistro, validarLogin } = require('../middlewares/validaciones/auth.validator');
const validarCampos = require('../middlewares/validaciones/validarCampos');

router.post('/registro', validarRegistro, validarCampos, registrarUsuario);
router.post('/login', validarLogin, validarCampos, login);

module.exports = router;
