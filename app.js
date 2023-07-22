// Importar Librerias
const express = require("express");
require("dotenv").config();

// Crear App

const app = express();
const PORT = process.env.PORT;

// Lectura y parseo del body
app.use(express.json());

// Directorio publico

app.use(express.static("public"));

// Inicializar Servidor

app.listen(PORT, () => {
  console.log(`Servidor Corriendo en el puerto: ${PORT}`);
});
