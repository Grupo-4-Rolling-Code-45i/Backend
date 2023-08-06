const mongoose = require("mongoose");
require("dotenv").config();
 
//BASE DE DATOS DEL PROYECTO --> ${process.env.DB_CNN} <--
//                                ^^^^^^^^^^^^^^^^^^                             
                                
const connectDB = async () => {  
  try {                          
     await mongoose.connect('mongodb+srv://WebPracticeMERN:DKf2SUjeLaPCEhul@webpractice.mrzzjvz.mongodb.net/');
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
