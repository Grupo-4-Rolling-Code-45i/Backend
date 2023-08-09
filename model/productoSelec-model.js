const { Schema, model } = require('mongoose');

const collection="productosSeleccionados";

const productoSeleccionadoSchema = Schema({
	nombre: {
		type: String,
		required: true,
	},

	precio: {
		type: Number,
		required: true,
	},

	cantidad: {
		type: Number,
		required: true,
	},

	usuario: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},
});

const ProductoSeleccionado=model(collection,productoSeleccionadoSchema);

module.exports = {ProductoSeleccionado};