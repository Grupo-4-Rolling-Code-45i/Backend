const express = require("express");
const {editarUsuario ,cargarUsuarios} = require("../controllers/users.controllers");
const routerUsers = express.Router();

routerUsers.put("/edit",editarUsuario);

routerUsers.get("/users",cargarUsuarios);


module.exports = routerUsers;