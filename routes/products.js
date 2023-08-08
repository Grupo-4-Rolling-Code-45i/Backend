const express = require("express");
const {
  crearProducto,
  eliminarProducto,
  cargarProductos,
  mostrarProductos,
} = require("../controllers/product.controllers");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const routerProducts = express.Router();

routerProducts.post(
  "/new",
   validarJWT,
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
routerProducts.delete("/delete/:id", eliminarProducto);

routerProducts.get("/", cargarProductos);

module.exports = routerProducts;
