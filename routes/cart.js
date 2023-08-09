const express = require("express");
const {
  obtenerCarrito,
  agregarProducto,
  actualizarCantidad,
  eliminarProducto,
} = require("../controllers/carrito.controllers");
const routerCart = express.Router();

// Obtener contenido del carrito
routerCart.get("/:usuario", obtenerCarrito);

// Agregar producto
routerCart.post("/new", agregarProducto);

// Actualizar cantidad
routerCart.put("/edit/:itemId", actualizarCantidad);

// Eliminar producto completo
routerCart.delete("/delete/:itemId", eliminarProducto);

module.exports = routerCart;
