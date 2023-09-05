const { Pedido } = require("../model/pedido");
const { validationResult } = require("express-validator");
const { Usuario } = require("../model/usuario");

const crearPedido = async (req, res) => {
  const pedido = req.body;

  try {
    const newPedido = await Pedido.create(pedido);

    return res.status(201).json({
      success: true,
      msg: "Producto creado satisfactoriamente",
      productInfo: newPedido,
    });
  } catch (error) {
    console.log(error);
  }
};

const cargarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();

    res.status(200).json({
      ok: true,
      pedidos,
    });
  } catch (error) {
    res.status(500).json({ msg: "error. contactese con el administrador" });
  }
};

const editarPedido = async (req, res) => {
  try {
    await Pedido.findByIdAndUpdate(req.body._id, { estado: req.body.estado });

    res.status(200).json({ ok: true, mge: "pedido-estado editado" });
  } catch (error) {
    res.status(500).json({ msg: "error. contactese con el administrador" });
  }
};

module.exports = { cargarPedidos, crearPedido, editarPedido };
