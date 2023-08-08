const express = require("express");

const auth = require("../middlewares/auth");
const { cargarPedidos, crearPedido } = require("../controllers/pedido.controllers");
const routerPedidos = express.Router();



routerPedidos.get("/",cargarPedidos);

routerPedidos.post("/new",crearPedido);



module.exports = routerPedidos;