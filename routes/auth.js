const express = require("express");
const {
  crearUsuarios,
  loginUsuario,
} = require("../controllers/auth.controllers");
const { check } = require("express-validator");
const routerAuth = express.Router();

routerAuth.post(
  "/new",
  [
    check("nombre", "Por favor ingrese un nombre válido").not().isEmpty(),
    check("edad", "Por favor ingrese una edad válida").not().isEmpty(),
    check("email", "Por favor ingrese un correo electrónico válido")
      .not()
      .isEmpty()
      .isEmail(),
    check(
      "password",
      "La contraseña debe ser mayor o igual a 8 caracteres"
    ).isLength({ min: 8 }),
  ],
  crearUsuarios
);

routerAuth.post(
  "/login",
  [
    check("email", "Por favor ingrese un correo electrónico válido")
      .not()
      .isEmpty()
      .isEmail(),
    check(
      "password",
      "La contraseña debe ser mayor o igual a 8 caracteres"
    ).isLength({ min: 8 }),
  ],
  loginUsuario
);

module.exports = routerAuth;
