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
  const { id } = req.params;
  const cita = await Cita.findById(id);
  if (!cita || cita.usuario) {
    return res.status(404).json({ error: 'Cita no disponible' });
  }

  cita.usuario = req.usuario._id;
  await cita.save();
  res.json({ mensaje: 'Cita asignada correctamente', cita });
};

module.exports = { crearCita, obtenerCitasDisponibles, asignarCita };
