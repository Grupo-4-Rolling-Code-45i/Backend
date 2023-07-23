const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_CNN}`);
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(
      "Ha ocurrido un error al intentar conectarse con la base de datos, por favor contactese con el administrador del sistema."
    );
  }
};

module.exports = {
  connectDB,
};
