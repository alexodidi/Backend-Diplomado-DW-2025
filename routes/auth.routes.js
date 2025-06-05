const express = require('express');
const router = express.Router();
const { registrarUsuario, login } = require('../controllers/auth.controller');

router.post('/registro', registrarUsuario);
router.post('/login', login);

module.exports = router;