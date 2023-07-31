const { Schema, model } = require('mongoose');

const collection="usuarios";

const usuarioSchema = Schema({
	nombre: {
		type: String,
		required: true,
	},
    edad: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},

	rol: {
		type: String,
		default: 'usuario',
	},

});

const Usuario=model(collection,usuarioSchema);

module.exports = {Usuario};