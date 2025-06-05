const express = require('express');
const router = express.Router();

// GET /usuarios
router.get('/', (req, res) => {
  res.json({ mensaje: 'Listado de usuarios' });
});

module.exports = router;
