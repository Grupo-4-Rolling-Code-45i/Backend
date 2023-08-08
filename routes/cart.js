const express = require('express');
const routerCart = express.Router();
const carritoControllers = require('../controllers/carrito.controllers');

// Obtener contenido del carrito
routerCart.get('/:usuario', carritoControllers.obtenerCarrito);

// Agregar producto
routerCart.post('/new', carritoControllers.agregarProducto);

// Actualizar cantidad
routerCart.put('/edit/:itemId', carritoControllers.actualizarCantidad);

// Eliminar producto completo
routerCart.delete('/delete/:itemId', carritoControllers.eliminarProducto);

module.exports = routerCart;