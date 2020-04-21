const mongoose = require('mongoose');
const Libro = require('./libro');
const Usuario = require('./usuario');

let Schema =  mongoose.Schema;

let PrestamoSchema = new Schema ({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Ingresar usuario']
    },
    fechaPrestamo: {
        type: String,
        required: [true, 'Ingresar fecha del prestamo del libro']
    },
    fechaEntrega: {
        type: String,
        required: [true, 'Ingresar fecha de entrega del libro']
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: [true, 'Ingresar libro']
    }
});

module.exports = mongoose.model('Prestamo', PrestamoSchema);