// Importar Librerias
const express = require("express");
const { connectDB } = require("./database/config");
require("dotenv").config();

// Crear App

const app = express();
const PORT = process.env.PORT;

// Lectura y parseo del body
app.use(express.json());

// Directorio publico

app.use(express.static("public"));

// Conectar a la base de datos
connectDB();

// Inicializar Servidor

app.listen(PORT, () => {
  console.log(`Servidor Corriendo en el puerto: ${PORT}`);
});
