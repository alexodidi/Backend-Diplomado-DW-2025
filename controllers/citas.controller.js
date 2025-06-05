const Cita = require('../models/Cita');

// Admin: crear nueva cita
const crearCita = async (req, res) => {
  try {
    const { tipo, fecha } = req.body;
    const nuevaCita = new Cita({
      tipo,
      fecha,
      creadaPor: req.usuario._id // asumimos que el usuario está autenticado
    });
    await nuevaCita.save();
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Usuario: ver citas disponibles
const obtenerCitasDisponibles = async (req, res) => {
  const citas = await Cita.find({ usuario: null });
  res.json(citas);
};

// Usuario: asignarse a una cita
const asignarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario._id;

    const citaAAsignar = await Cita.findById(id);
    if (!citaAAsignar || citaAAsignar.usuario) {
      return res.status(404).json({ error: 'Cita no disponible o ya asignada' });
    }

    // Validar si ya tiene una cita en la misma fecha y hora
    const conflicto = await Cita.findOne({
      usuario: usuarioId,
      fecha: citaAAsignar.fecha
    });

    if (conflicto) {
      return res.status(409).json({
        error: 'Ya tienes una cita asignada en esta fecha y hora'
      });
    }

    // Asignar cita
    citaAAsignar.usuario = usuarioId;
    await citaAAsignar.save();

    res.json({ mensaje: 'Cita asignada correctamente', cita: citaAAsignar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al asignar cita' });
  }
};

module.exports = { crearCita, obtenerCitasDisponibles, asignarCita };
