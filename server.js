const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ---- PESOS ----
app.post("/api/convert/peso", (req, res) => {
  const { value, from, to } = req.body;

  const rates = {
    kg: 1,
    g: 1/1000,
    lb: 0.45359237,
  };

  if (!rates[from] || !rates[to]) {
    return res.status(400).json({ error: "Unidad no válida" });
  }

  const result = (value / rates[from]) * rates[to];
  res.json({ result });
});

// ---- TEMPERATURA ----
app.post("/api/convert/temp", (req, res) => {
  const { value, from, to } = req.body;
  let result = value;

  if (from === "C" && to === "F") result = (value * 9) / 5 + 32;
  if (from === "C" && to === "K") result = value + 273.15;
  if (from === "F" && to === "C") result = ((value - 32) * 5) / 9;
  if (from === "F" && to === "K") result = ((value - 32) * 5) / 9 + 273.15;
  if (from === "K" && to === "C") result = value - 273.15;
  if (from === "K" && to === "F") result = ((value - 273.15) * 9) / 5 + 32;

  res.json({ result });
});

// ---- TIEMPO ----
app.post("/api/convert/tiempo", (req, res) => {
  const { value, from, to } = req.body;

  const units = {
    segundos: 1,
    minutos: 60,
    horas: 3600,
    dias: 86400,
    semanas: 604800,
    meses: 2628000,
    años: 31536000,
  };

  if (!units[from] || !units[to]) {
    return res.status(400).json({ error: "Unidad no válida" });
  }

  const result = (value * units[from]) / units[to];
  res.json({ result });
});

// ---- MONEDAS ----
app.post("/api/convert/moneda", (req, res) => {
  const { value, from, to } = req.body;

  const rates = {
    USD: 1,
    EUR: 0.92,
    COP: 4100,
  };

  if (!rates[from] || !rates[to]) {
    return res.status(400).json({ error: "Moneda no válida" });
  }

  const result = (value / rates[from]) * rates[to];
  res.json({ result });
});

// ---- PUERTO ----
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
