const {Schema,model}=require("mongoose");

const collection="productos";

const productoSchema=Schema({
nombre:{
    type: String,
    required: true,
},

precio:{
    type:Number,
    required: true,
    
},

descripcion:{
    type:String,
    required: true,

},
imagen:{
    type:String,
    required: true,

},
});
const Producto=model(collection,productoSchema);
module.exports= {Producto};