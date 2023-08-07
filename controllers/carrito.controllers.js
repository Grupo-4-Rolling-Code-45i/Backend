const { ProductoSeleccionado } = require('../model/productoSelec-model');

// Controlador para obtener contenido del carrito de compras de un user
const obtenerCarrito = async (req, res) => {
  try {
    const usuarioId = req.usuario._id;
    const carrito = await ProductoSeleccionado.find({ usuario: usuarioId });
    res.status(200).json({ok:true, carrito});
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito de compras' });
  }
};

// Controlador para agregar un producto al carrito
const agregarProducto = async (req, res) => {
  try {
    const usuarioId = req.usuario._id;
    const { nombre, precio, cantidad, descripcion } = req.body;
    const nuevoProducto = new ProductoSeleccionado({
        nombre,
        precio,
        cantidad,
        descripcion,
        usuario: usuarioId,
    });
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
};

// Controlador para actualizar cantidad
const actualizarCantidad = async (req, res) => {
  try {
    const usuarioId = req.usuario._id;
    const itemId = req.params.itemId;
    const { cantidad } = req.body;
    await ProductoSeleccionado.findOneAndUpdate(
      { _id: itemId, usuario: usuarioId },
      { cantidad },
      { new: true }
    );
    res.status(200).json({ message: 'Cantidad actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cantidad' });
  }
};

// Controlador para quitar del carrito
const eliminarProducto = async (req, res) => {
  try {
    const usuarioId = req.usuario._id;
    const itemId = req.params.itemId;
    const quitarProducto = await ProductoSeleccionado.findOneAndDelete({ _id: itemId, usuario: usuarioId });
    if (!quitarProducto) {
        return res.status(200).json({
            success: true,
            msg: 'No se encontró el producto que desea quitar',
        });
    }
    return res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    // res.status(500).json({ error: 'Ha ocurrido un error, contactese con el administrador del sitio' });
    console.log("error")
  }
};

module.exports = {
  obtenerCarrito,
  agregarProducto,
  actualizarCantidad,
  eliminarProducto,
};