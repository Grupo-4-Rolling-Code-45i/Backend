const express = require("express");
const { crearProducto } = require("../controllers/admin.controllers");
const { check } = require("express-validator");
const routerAdmin = express.Router();

routerAdmin.post("/new", crearProducto);

module.exports = routerAdmin;
