const { validationResult } = require("express-validator");
const { Usuario } = require("../model/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Lógica crear usuarios
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
    // Generar JWT
    const payload = {
      id: usuario._id,
      nombre: usuario.nombre,
      rol: usuario.rol,
    };
    const token = jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: "1h",
    });
    res.status(201).json({
      success: true,
      msg: "Usuario creado correctamente",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Hubo un error, por favor contactese con el administrador",
    });
  }
};





module.exports = { crearUsuarios };
