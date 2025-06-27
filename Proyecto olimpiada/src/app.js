const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('BenteveoAir API funcionando 🚀');
});

// Escuchar en puerto
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
