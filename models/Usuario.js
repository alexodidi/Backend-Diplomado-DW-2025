const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  correo: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Correo inválido'],
    lowercase: true
  },
  contraseña: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener mínimo 6 caracteres']
  },
  rol: {
    type: String,
    enum: ['admin', 'usuario'],
    default: 'usuario'
  }
}, {
  timestamps: true
});

const bcrypt = require('bcryptjs');

// Hashear contraseña antes de guardar
UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

// Método para comparar contraseña ingresada
UsuarioSchema.methods.compararPassword = function (passwordIngresada) {
  return bcrypt.compare(passwordIngresada, this.contraseña);
};


module.exports = mongoose.model('Usuario', UsuarioSchema);
