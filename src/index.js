// src/index.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Endpoint de prueba
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

// Conversión (ejemplo de temperaturas, monedas y tiempo)
app.post("/api/convert", (req, res) => {
  const { type, value, from, to } = req.body;

  let result = null;

  // 🔹 Conversión de temperatura
  if (type === "temperature") {
    if (from === "C" && to === "F") result = (value * 9) / 5 + 32;
    if (from === "F" && to === "C") result = ((value - 32) * 5) / 9;
    if (from === "C" && to === "K") result = value + 273.15;
    if (from === "K" && to === "C") result = value - 273.15;
    if (from === "F" && to === "K") result = ((value - 32) * 5) / 9 + 273.15;
    if (from === "K" && to === "F") result = ((value - 273.15) * 9) / 5 + 32;
  }

  // 🔹 Conversión de tiempo (ejemplo básico: segundos → minutos)
  if (type === "time") {
    const units = {
      seconds: 1,
      minutes: 60,
      hours: 3600,
      days: 86400,
    };

    if (units[from] && units[to]) {
      result = (value * units[from]) / units[to];
    }
  }

  // 🔹 Conversión de moneda (ejemplo con tasas fijas)
  if (type === "currency") {
    const rates = {
      USD: 1,
      EUR: 0.9,
      COP: 4100,
    };

    if (rates[from] && rates[to]) {
      result = (value / rates[from]) * rates[to];
    }
  }

  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
