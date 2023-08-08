const { Pedido } = require("../model/pedido");
const { validationResult } = require("express-validator");
const { Usuario } = require("../model/usuario");

// Agregar pedido
const crearPedido = async (req, res) => {
    // Aqui saco la info de todos los datos que necesito
    const pedido = req.body;
    // const errors = validationResult(req);
    // // Verifico errores
    // if (!errors.isEmpty()) {
    //   return res.json({
    //     errors: errors.mapped(),
    //   });
    // }
    try {
      // Creo constante con los datos de producto
      const newPedido = await Pedido.create(pedido);
      // Doy respuesta con la informacion necesaria
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


    }

    catch (error) {
        res.status(500).json({ msg: "error. contactese con el administrador" });
    }


};

const editarPedido = async(req,res) => {

  try{
     

  await Pedido.findByIdAndUpdate(req.body._id,{estado:req.body.estado});

  res.status(200).json({ok: true, mge:"pedido-estado editado"});



 }

  catch(error){
      res.status(500).json({msg:"error. contactese con el administrador"});
          }
};



module.exports ={cargarPedidos,crearPedido,editarPedido}