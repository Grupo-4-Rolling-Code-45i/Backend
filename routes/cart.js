const express = require('express');
const routerCart = express.Router();
const carritoControllers = require('../controllers/carrito.controllers');

// Obtener contenido cart
routerCart.get('/', carritoControllers.obtenerCarrito);

// Agregar prod
routerCart.post('/add', carritoControllers.agregarProducto);

// Actualizar cantidad
routerCart.put('/update/:itemId', carritoControllers.actualizarCantidad);

// Eliminar prod
routerCart.delete('/remove/:itemId', carritoControllers.eliminarProducto);

module.exports = routerCart;