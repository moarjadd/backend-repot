const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Crear una instancia de la aplicación Express
const app = express();
const port = process.env.PORT || 3000; // Puerto dinámico proporcionado por Render

// Configurar CORS para permitir solicitudes del ESP32
app.use(cors());

// Variable para controlar el estado del relé
let relayState = false;

// Usar body-parser para analizar JSON
app.use(bodyParser.json());

// Ruta POST para recibir los datos
app.post('/sensors/dht11', (req, res) => {
  const { temperature, humidity } = req.body;

  if (temperature !== undefined && humidity !== undefined) {
    sensorData = { temperature, humidity };  // Guardar los datos en sensorData
    console.log(`Temperatura: ${temperature}°C, Humedad: ${humidity}%`);
    res.status(200).json({ message: 'Datos recibidos correctamente' });
  } else {
    res.status(400).json({ message: 'Faltan datos de temperatura o humedad' });
  }
});

// Ruta GET para enviar los datos al frontend
app.get('/sensors/dht11', (req, res) => {
  if (sensorData.temperature !== undefined && sensorData.humidity !== undefined) {
    res.status(200).json(sensorData);  // Enviar los datos al frontend
  } else {
    res.status(404).json({ message: 'Datos no encontrados' });
  }
});

// Ruta para controlar el relé
app.post('/controls/relay', (req, res) => {
  const { action } = req.body; // Acción para encender o apagar el relé
  
  // Verificar si la acción es "on" o "off"
  if (action === 'on') {
    relayState = true;
    console.log("Relé activado");
    res.status(200).json({ message: 'Bomba activada' });
  } else if (action === 'off') {
    relayState = false;
    console.log("Relé desactivado");
    res.status(200).json({ message: 'Bomba desactivada' });
  } else {
    // Si la acción no es "on" ni "off", devolver un error
    res.status(400).json({ message: 'Acción no válida. Se esperaba "on" o "off"' });
  }
});

// Ruta GET para obtener el estado del relé
app.get('/states/relay', (req, res) => {
  res.status(200).json({ relayState });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});