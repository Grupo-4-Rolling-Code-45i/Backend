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

const editarProducto = async(req,res) => {

  try{
      const productoEdit= await Producto.findById(req.body._id);
      console.log(productoEdit);
      if(!productoEdit)
      {
res.status(404),json({
  ok: false,
  mge:"no existe producto con ese ID"});
      }

await Producto.findByIdAndUpdate(req.body._id,req.body);

res.status(200).json({ok: true, mge:"producto editado"});

  }



  catch(error){
      res.status(500).json({msg:"error. contactese con el administrador"});
          }




};

module.exports = {
  crearProducto,
  eliminarProducto,
  mostrarProductos,
  cargarProductos,
  editarProducto
};
