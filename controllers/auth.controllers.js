const { validationResult } = require("express-validator");
const { Usuario } = require("../model/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const crearUsuarios = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ success: false, errors: errors.mapped() });
  }
  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(409).json({
        msg: "Ya existe un usuario registrado con ese correo electronico",
      });
    }
    usuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
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

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ success: false, errors: errors.mapped() });
  }

  try {
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        msg: "email o contraseña incorrectos",
      });
    }

    const validarContraseña = bcrypt.compareSync(password, usuario.password);
    if (!validarContraseña) {
      return res.status(400).json({
        msg: "email o contraseña incorrectos",
      });
    }

    if (usuario.estado === "inactivo") {
      return res.status(401).json({
        msg: "Usuario deshabilitado",
      });
    }

    const payload = {
      id: usuario._id,
      nombre: usuario.nombre,
      rol: usuario.rol,
    };

    const token = jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      msg: "Usuario logueado correctamente",
      token,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un error, por favor contactese con el administrador",
    });
  }
};

module.exports = { crearUsuarios, loginUsuario };
