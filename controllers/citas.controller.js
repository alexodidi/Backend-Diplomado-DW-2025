const Cita = require('../models/Cita');
const Usuario = require('../models/Usuario');

// Admin: crear nueva cita
const crearCita = async (req, res) => {
  try {
    const { tipo, fecha, usuario } = req.body;

    // Si se proporciona un usuario, verificar que exista
    let usuarioAsignado = null;
    if (usuario) {
      usuarioAsignado = await Usuario.findById(usuario);
      if (!usuarioAsignado) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
    }

    const nuevaCita = new Cita({
      tipo,
      fecha,
      usuario: usuarioAsignado ? usuarioAsignado._id : null,
      creadaPor: req.usuario._id
    });

    await nuevaCita.save();
    res.status(201).json(nuevaCita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear cita' });
  }
};

// Usuario: ver citas disponibles
const obtenerCitasDisponibles = async (req, res) => {
  const citas = await Cita.find({ usuario: null });
  res.json(citas);
};

const getCitasAsignadasAlUsuario = async (req, res) => {
  try {
    const citas = await Cita.find({ usuario: req.usuario._id });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener citas asignadas' });
  }
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

const desasignarCita = async (req, res) => {
  try {
    const { id } = req.params;

    const cita = await Cita.findById(id);

    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    if (!cita.usuario || cita.usuario.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({ error: 'No puedes cancelar esta cita' });
    }

    cita.usuario = null;
    await cita.save();

    res.json({ mensaje: 'Cita cancelada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al cancelar cita' });
  }
};

const obtenerTodasLasCitas = async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate('usuario', 'nombre correo rol') // opcional: muestra info del usuario asignado
      .sort({ fecha: 1 });

    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener citas' });
  }
};

const eliminarCita = async (req, res) => {
  try {
    const { id } = req.params;

    const cita = await Cita.findById(id);
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    await cita.deleteOne();

    res.json({ mensaje: 'Cita eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cita' });
  }
};


module.exports = { crearCita, obtenerCitasDisponibles, getCitasAsignadasAlUsuario, asignarCita, desasignarCita, obtenerTodasLasCitas,eliminarCita };
