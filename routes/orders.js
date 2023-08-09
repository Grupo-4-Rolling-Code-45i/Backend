const express = require("express");

const auth = require("../middlewares/auth");
const { cargarPedidos, crearPedido, editarPedido } = require("../controllers/pedido.controllers");
const routerPedidos = express.Router();



routerPedidos.get("/",cargarPedidos);

routerPedidos.post("/new",crearPedido);

routerPedidos.put("/edit",editarPedido);

module.exports = routerPedidos;