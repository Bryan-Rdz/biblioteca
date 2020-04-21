const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema ({
    nombre: {
        type: String,
        required: true
    }
});

categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser unico y diferente' 
});

module.exports = mongoose.model('Categoria', categoriaSchema);