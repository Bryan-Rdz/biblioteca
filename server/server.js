//Importamos
require('./config/config');
const mongoose = require('mongoose');
const express = require('express');
//Declarando constante app
const app = express();
const bodyParser = require ('body-parser');

// Habilitacion de CORS  Cargar los servidores ajenos
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Que origen puede hacer peticion al servidor
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization,token'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,DELETE,OPTIONS'
    );
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({}));

app.use(require('./routes/index'));

//requiest la escucha
//responsble responder

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
},
    (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
});

    app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto 3000');
});
