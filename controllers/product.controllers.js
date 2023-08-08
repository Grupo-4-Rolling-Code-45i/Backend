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
    console.log(producto);
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

//Cargar producto
const cargarProductos = async (req, res) => {
  try {
    const productos = await Producto.find();

    res.status(200).json({ ok: true, productos });
  } catch (error) {
    res.status(500).json({ msg: "error. contactese con el administrador" });
  }
};

// Mostrar productos inicio

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

// Mostrar un producto

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

// Buscar productos por nombre
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

// //editar producto
// const editarProducto = async (req, res) => {
// try { 

      

  
// } catch (error) {
//   console.log(
//     "Ha ocurrido un error, por favor contacte con el administrador"
//   );
//   res.status(500).json({
//     msg: "Error interno del servidor. Por favor, contacte al administrador",
//   });
// }


// };

const editarProducto = async (req, res) => {
  try {
    const productoID = req.params._id;
    const producto = await Producto.findById(productoID);
    if (!producto) {
      return res.status(404).json({
        success: false,
        msg: "No se encontraron productos",
      });
    }
    const productoActualizado = await Producto.findByIdAndUpdate(
      productoID,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      msg: "Producto actualizado",
      response: productoActualizado,
    });
  } catch (error) {
    console.log(
      "Ha ocurrido un error, por favor contactese con el administrador"
    );

    res.status(500).json({
      msg: "Error interno del servidor. Por favor, contacte al administrador",
    });
  }
};




module.exports = {
  crearProducto,
  eliminarProducto,
  mostrarProductos,
  cargarProductos,
  mostrarUnProducto,
  buscarProductos,
  editarProducto
};
