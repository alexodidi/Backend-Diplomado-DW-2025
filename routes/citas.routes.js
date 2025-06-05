const express = require('express');
const router = express.Router();

const {
  crearCita,
  obtenerCitasDisponibles,
  asignarCita
} = require('../controllers/citas.controller');

const verificarToken = require('../middlewares/auth.middleware');
const soloRol = require('../middlewares/rol.middleware');
const { validarCrearCita } = require('../middlewares/validaciones/cita.validator');
const validarCampos = require('../middlewares/validaciones/validarCampos');

router.get('/', verificarToken, obtenerCitasDisponibles);
router.post('/asignar/:id', verificarToken, soloRol('usuario'), asignarCita);

// Solo admin puede crear citas
router.post('/', verificarToken, soloRol('admin'), validarCrearCita, validarCampos, crearCita);

module.exports = router;