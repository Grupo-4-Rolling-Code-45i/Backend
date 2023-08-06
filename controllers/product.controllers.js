const { validationResult } = require("express-validator");
const { Producto } = require("../model/producto-model");

// Agregar productos
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
// Eliminar productos
const eliminarProducto = async (req, res) => {
  try {
    const borrarProducto = await Producto.findOneAndDelete({
      _id: req.params.id,
    });
    if (!borrarProducto) {
      return res.status(200).json({
        success: true,
        msg: "No se encontró el producto que desea eliminar",
      });
    }
    return res
      .status(200)
      .json({
        success: true,
        msg: "Producto eliminado",
        response: borrarProducto._id,
      });
  } catch (error) {
    console.log(
      "Ha ocurrido un error, por favor contactese con el administrador"
    );
  }
};
module.exports = { crearProducto, eliminarProducto };