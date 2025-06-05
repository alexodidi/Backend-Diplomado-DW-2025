const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['medico_general', 'odontologica', 'psicologica'],
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null // Si null = disponible
  },
  creadaPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cita', CitaSchema);