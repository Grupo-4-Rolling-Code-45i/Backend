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

// rutas
app.use("/api/products/", require("./routes/products"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/orders", require("./routes/orders")) 




// Inicializar Servidor
app.listen(PORT, () => {
  console.log(`Servidor Corriendo en el puerto: ${PORT}`);
});
