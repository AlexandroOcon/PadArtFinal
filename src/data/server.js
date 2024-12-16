// backend/server.js
const express = require("express");
const mercadopago = require("mercadopago");

const app = express();

// Configura tu clave de acceso
mercadopago.configure({
  access_token: "APP_USR-6434816540896229-121603-360c56eb030cb8cad7bed428bf624774-523197074", // Reemplaza con tu access token de Mercado Pago
});

app.use(express.json());

// Endpoint para crear una preferencia
app.post("/create_preference", (req, res) => {
  const { items, payer } = req.body;

  const preference = {
    items: items,
    payer: payer,
    back_urls: {
      success: "http://localhost:3000/success",
      failure: "http://localhost:3000/failure",
      pending: "http://localhost:3000/pending",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({ id: response.body.id });
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send("Error al crear la preferencia");
    });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
