// Importar Librerias
const express = require("express");
require("dotenv").config();

// Crear App

const app = express();
const PORT = process.env.PORT;

// Inicializar Servidor

app.listen(PORT, () => {
  console.log(`Servidor Corriendo en el puerto: ${PORT}`);
});
