const express = require("express");
const {editarUsuario ,cargarUsuarios, getAuthStatus} = require("../controllers/users.controllers");
const auth = require("../middlewares/auth");
const routerUsers = express.Router();

routerUsers.put("/edit",auth,editarUsuario);

routerUsers.get("/",cargarUsuarios);

routerUsers.get("/authStatus", auth, getAuthStatus);

module.exports = routerUsers;