const { check } = require('express-validator');

const validarRegistro = [
  check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio'),

  check('correo')
    .isEmail().withMessage('Correo inválido'),

  check('contraseña')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

  check('rol')
    .optional()
    .isIn(['admin', 'usuario']).withMessage('Rol inválido')
];

const validarLogin = [
  check('correo')
    .isEmail().withMessage('Correo inválido'),

  check('contraseña')
    .notEmpty().withMessage('La contraseña es obligatoria')
];

module.exports = {
  validarRegistro,
  validarLogin
};