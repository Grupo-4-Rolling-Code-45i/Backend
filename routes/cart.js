const express = require('express');
const routerCart = express.Router();
const carritoControllers = require('../controllers/carrito.controllers');

// Obtener contenido cart
routerCart.get('/', carritoControllers.obtenerCarrito);

// Agregar prod
routerCart.post('/new', carritoControllers.agregarProducto);

// Actualizar cantidad
routerCart.put('/edit/:itemId', carritoControllers.actualizarCantidad);

// Eliminar prod
routerCart.delete('/delete/:itemId', carritoControllers.eliminarProducto);

module.exports = routerCart;