const { validationResult } = require("express-validator");
const { Usuario } = require("../model/usuario");
const bcrypt = require("bcrypt");

const crearUsuarios = async (req, res) => {
  const { email, password } = req.body;

  // Validacion de Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ success: false, errors: errors.mapped() });
  }
  try {
    // Pregunto si ya existe un usuario creado con ese email
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(409).json({
        msg: "Ya existe un usuario registrado con ese correo electronico",
      });
    }
    usuario = new Usuario(req.body);
    // Encriptacion de la contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardo el usuario en la base de datos
    await usuario.save();
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Hubo un error, por favor contactese con el administrador",
    });
  }
  res.status(201).json({
    success: true,
    msg: "Usuario creado correctamente",
  });
};

module.exports = { crearUsuarios };
