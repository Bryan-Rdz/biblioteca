const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema =  mongoose.Schema;

let libroSchema = new Schema ({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Ingrese nombre del libro']
    },
    descripcion: {
        type: String,
        required: [true, 'Ingrese una descripción']
    },
    disponible: {
        type: Boolean,
        default: true
    },    
    categoria: {
        type: String,
        required: [true, 'Ingrese la categoría del libro']
    },
    img: {
        type: String,
    }
});

libroSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe que ser único y diferente'
});

module.exports =  mongoose.model('Libro', libroSchema);