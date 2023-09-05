const express = require("express");
const { connectDB } = require("./database/config");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

const cors = require("cors");

app.use(cors());

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

connectDB();

app.use("/api/products/", require("./routes/products"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/cart", require("./routes/cart"));

app.listen(PORT, () => {
  console.log(`Servidor Corriendo en el puerto: ${PORT}`);
});
