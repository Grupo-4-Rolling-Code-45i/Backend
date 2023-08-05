const express = require("express");
const { crearUsuarios,editarUsuario } = require("../controllers/auth.controllers");
const { check } = require("express-validator");
const routerAuth = express.Router();

routerAuth.put("/edit",editarUsuario);


module.exports = routerAuth;