const { check } = require('express-validator');

const validarCrearCita = [
  check('tipo')
    .isIn(['medico_general', 'odontologica', 'psicologica']).withMessage('Tipo de cita inválido'),

  check('fecha')
    .isISO8601().toDate().withMessage('La fecha debe tener formato válido (ISO 8601)')
];

module.exports = { validarCrearCita };