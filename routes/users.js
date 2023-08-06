const express = require("express");
const {editarUsuario ,cargarUsuarios} = require("../controllers/users.controllers");
const routerUsers = express.Router();

routerUsers.put("/edit",editarUsuario);

routerUsers.get("/",cargarUsuarios);


module.exports = routerUsers;