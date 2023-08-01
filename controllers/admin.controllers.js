const { validationResult } = require("express-validator");
const { Producto } = require("../model/producto-model");

const crearProducto = async (req, res) => {
  // Aqui saco la info de todos los datos que necesito
  const producto = req.body;
  const errors = validationResult(req);
  // Verifico errores
  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.mapped(),
    });
  }
  try {
    // Creo constante con los datos de producto
    const newProduct = await Producto.create(producto);
    // Doy respuesta con la informacion necesaria
    return res.status(201).json({
      success: true,
      msg: "Producto creado satisfactoriamente",
      productInfo: newProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { crearProducto };
