const express = require("express");
const {
  crearProducto,
  eliminarProducto,
  cargarProductos,
  mostrarProductos,
  mostrarUnProducto,
  buscarProductos,
  editarProducto,
} = require("../controllers/product.controllers");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const auth = require("../middlewares/auth");
const routerProducts = express.Router();

routerProducts.post(
  "/new",
  auth,
  [
    check("nombre", "Por favor, ingrese un nombre válido").not().isEmpty(),
    check("precio", "Por favor, ingrese un precio válido").not().isEmpty(),
    check(
      "descripcion",
      "Por favor, ingrese una descripcion con al menos 10 caracteres válido"
    ).isLength({ min: 10 }),
    check("imagen", "Por favor, ingrese un enlace de imagen válido")
      .not()
      .isEmpty(),
  ],
  crearProducto
);
routerProducts.get("/", mostrarProductos);
routerProducts.delete("/delete/:id",auth, eliminarProducto);
// Mostrar todos los productos
routerProducts.get("/", cargarProductos);
// Mostrar un producto por su id
routerProducts.get("/get-one/:id", mostrarUnProducto);
routerProducts.get("/buscar/:term", buscarProductos);
routerProducts.put("/edit",auth, editarProducto);
// Mostrar un producto por su id
routerProducts.get("/get-one/:id", mostrarUnProducto);
module.exports = routerProducts;
