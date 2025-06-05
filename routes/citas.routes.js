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
router.get('/mis-citas', verificarToken, soloRol('usuario'), getCitasAsignadasAlUsuario);
router.delete('/mis-citas/:id', verificarToken, soloRol('usuario'), desasignarCita);

// Solo admin puede crear y eliminar citas
router.post('/', verificarToken, soloRol('admin'), validarCrearCita, validarCampos, crearCita);
router.delete('/:id', verificarToken, soloRol('admin'), eliminarCita);
router.get('/admin', verificarToken, soloRol('admin'), obtenerTodasLasCitas);

module.exports = router;