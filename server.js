const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Crear una instancia de la aplicación Express
const app = express();
const port = process.env.PORT || 3000; // Puerto dinámico proporcionado por Render

// Configurar CORS para permitir solicitudes del ESP32
app.use(cors());

// Usar body-parser para analizar JSON
app.use(bodyParser.json());

// Ruta para recibir los datos del sensor DHT11
app.post('/sensors/dht11', (req, res) => {
  const { temperature, humidity } = req.body;

  if (temperature !== undefined && humidity !== undefined) {
    console.log(`Temperatura: ${temperature}°C, Humedad: ${humidity}%`);
    res.status(200).json({ message: 'Datos recibidos correctamente' });
  } else {
    res.status(400).json({ message: 'Faltan datos de temperatura o humedad' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});