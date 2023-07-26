const { Schema, model } = require('mongoose');

const collection="pedidos";

const pedidoSchema = Schema({
	producto: {
		type: Array,
        required: true,
	},

	fecha: {
		type: String,
		default: new Date().toLocaleString(),
	},

	estado: {
		type: String,
		default: 'pendiente',
	},

	usuario: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},
});

const Pedido=model(collection,pedidoSchema);
module.exports = {Pedido};