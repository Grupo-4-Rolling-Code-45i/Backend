
const { Usuario } = require("../model/usuario");


const editarUsuario = async(req,res) => {

    try{
       
  if(req.body.estado)
  {
    await Usuario.findByIdAndUpdate(req.body._id,{estado:req.body.estado});
  
    res.status(200).json({ok: true, mge:"usuario-estado editado"});
  }
  
  else if(req.body.rol)
  {
    await Usuario.findByIdAndUpdate(req.body._id,{rol:req.body.rol});
  
    res.status(200).json({ok: true, mge:"usuario-rol editado"});
  }
   }
  
    catch(error){
        res.status(500).json({msg:"error. contactese con el administrador"});
            }
  };

const cargarUsuarios= async (req,res) =>
{

try {
const usuarios= await Usuario.find();

res.status(200).json({ok:true,
    usuarios,
});


}

catch(error){
  res.status(500).json({msg:"error. contactese con el administrador"});
      }


};
  
const getAuthStatus = async (req, res) => {
  try {
    const id = req.id;

    const user = await Usuario.findById(id);
    if (!user) throw new CustomError("Autenticación fallida", 401);
    res.status(200).json({ user });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message || "Ups! Hubo un problema, por favor intenta más tarde",
    });
  }
};
  
  module.exports = {editarUsuario,cargarUsuarios, getAuthStatus};