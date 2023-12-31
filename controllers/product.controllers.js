const { validationResult } = require("express-validator");
const { Producto } = require("../model/producto-model");

const crearProducto = async (req, res) => {
  const producto = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.mapped(),
    });
  }
  try {
    const newProduct = await Producto.create(producto);

    return res.status(201).json({
      success: true,
      msg: "Producto creado satisfactoriamente",
      productInfo: newProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

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
    return res.status(200).json({
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

const cargarProductos = async (req, res) => {
  try {
    const productos = await Producto.find();

    res.status(200).json({ ok: true, productos });
  } catch (error) {
    res.status(500).json({ msg: "error. contactese con el administrador" });
  }
};

const mostrarProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    if (!productos) {
      return res.status(200).json({
        success: true,
        msg: "No se encontraron productos",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Productos encontrados",
      response: productos,
    });
  } catch (error) {
    console.log(
      "Ha ocurrido un error, por favor contactese con el administrador"
    );
  }
};

const mostrarUnProducto = async (req, res) => {
  try {
    const productoID = req.params.id;
    const producto = await Producto.findById(productoID);
    if (!producto) {
      return res.status(404).json({
        success: false,
        msg: "No se encontraron productos",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Producto encontrado",
      response: producto,
    });
  } catch (error) {
    console.log(
      "Ha ocurrido un error, por favor contactese con el administrador"
    );
  }
};

const buscarProductos = async (req, res) => {
  try {
    const { term } = req.params;
    if (!term) {
      return res.status(400).json({
        success: false,
        msg: "Debe proporcionar un término en su búsqueda.",
      });
    }

    const productos = await Producto.find({
      nombre: { $regex: new RegExp(term, "i") },
    });

    if (productos.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "No se encontraron productos con el término de búsqueda proporcionado.",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Productos encontrados",
      response: productos,
    });
  } catch (error) {
    console.log(
      "Ha ocurrido un error, por favor contacte con el administrador"
    );
    res.status(500).json({
      msg: "Error interno del servidor. Por favor, contacte al administrador",
    });
  }
};

const editarProducto = async (req, res) => {
  try {
    const productoEdit = await Producto.findById(req.body._id);

    if (!productoEdit) {
      res.status(404),
        json({
          ok: false,
          mge: "no existe producto con ese ID",
        });
    }

    await Producto.findByIdAndUpdate(req.body._id, req.body);

    res.status(200).json({ ok: true, mge: "producto editado" });
  } catch (error) {
    res.status(500).json({ msg: "error. contactese con el administrador" });
  }
};

module.exports = {
  crearProducto,
  eliminarProducto,
  mostrarProductos,
  cargarProductos,
  mostrarUnProducto,
  buscarProductos,
  editarProducto,
  mostrarUnProducto,
};
