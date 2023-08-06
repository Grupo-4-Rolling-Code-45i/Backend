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



// Usar CORS
app.use(cors());

// Conectar a la base de datos
connectDB();

// con esta ruta no me anda
app.use("/api/products/", require("./routes/products"));
app.use("/api/auth", require("./routes/auth"));


//rutas  con la que si me anda
app.use("/auth", require("./routes/auth"));

// Inicializar Servidor
app.listen(PORT, () => {
  console.log(`Servidor Corriendo en el puerto: ${PORT}`);
});
