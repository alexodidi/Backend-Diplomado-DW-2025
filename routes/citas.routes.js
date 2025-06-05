const express = require('express');
const router = express.Router();
const {
  crearCita,
  obtenerCitasDisponibles,
  asignarCita
} = require('../controllers/citas.controller');

// Nota: en este punto estamos ignorando autenticación real

router.get('/', obtenerCitasDisponibles);       // GET /api/citas
router.post('/', crearCita);                    // POST /api/citas
router.post('/asignar/:id', asignarCita);       // POST /api/citas/asignar/:id

module.exports = router;