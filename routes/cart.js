const express = require("express");
const {
  obtenerCarrito,
  agregarProducto,
  actualizarCantidad,
  eliminarProducto,
} = require("../controllers/carrito.controllers");
const routerCart = express.Router();

routerCart.get("/:usuario", obtenerCarrito);

routerCart.post("/new", agregarProducto);

routerCart.put("/edit/:itemId", actualizarCantidad);

routerCart.delete("/delete/:itemId", eliminarProducto);

module.exports = routerCart;
