// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Configurar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Ruta de prueba
app.get('/', (req, res) => {
  res.status(200).json({ mensaje: 'Servidor funcionando correctamente' });
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conexión a MongoDB exitosa');
  // Levantar servidor solo si conexión es exitosa
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error.message);
});

const usuariosRoutes = require('./routes/usuarios.routes');
app.use('/api/usuarios', usuariosRoutes);
