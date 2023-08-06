// Importar Librerias
const express = require("express");
const { connectDB } = require("./database/config");
require("dotenv").config();

// Crear App
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");

// Lectura y parseo del body
app.use(express.json());

// Directorio publico
app.use(express.static("public"));

//rutas
app.use("/auth", require("./routes/auth"));

// Usar CORS
app.use(cors());

// Conectar a la base de datos
connectDB();

// Inicializar Servidor

// Apis
app.use("/api/auth", require("./routes/auth"));
app.listen(PORT, () => {
  console.log(`Servidor Corriendo en el puerto: ${PORT}`);
});
