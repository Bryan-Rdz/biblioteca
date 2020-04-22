const express = require('express');
const _ = require('underscore');
const { verificaToken }= require('../middleware/autenticacion');
const Libro = require('../models/libro');
const app = express();

//get
app.get('/libro', [verificaToken],  (req, res) => {
    Libro.find( )
    .exec((err, libros) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de consultar ${err}`
            });
        }

         res.json({
            ok: false,  /// true 
            mensaje: 'Consulta realizada con exito', 
            libros
        });
    });
});

//post Agregar nuevos libros
app.post('/libro', [verificaToken], (req, res) => {
    let body = req.body;

    let libro = new Libro ({
        nombre: body.nombre,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    libro.save((err, lbDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de guardar ${err}`
            });
        }

         res.json({
            ok: true,
            mensaje: 'El libro ha sido insertado con exito',
          libro: lbDB
        });
    });
});

//put
app.put('/libro/:id', [verificaToken], function (req, res){
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','categoria', 'descripcion']);

    Libro.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query'}, (err, lbrDB) => {
      if(err){
        return res.status(400).json({
            ok: false,
            mensaje: `Ocurrio un error al momento de actualizar ${err}`
        });
      }
      return res.json({
        ok: true,
        mensaje: 'Cambios guardados con exito',
        libro: lbrDB 
      });
    });
  });

//delete
app.delete('/libro/:id', [verificaToken], function (req, res){
    let id = req.params.id;
 
 Libro.findByIdAndUpdate(id, { estado: false}, {new: true, runValidators: true, context: 'query' }, (err, resp)=>{
   if(err){
     return res.status(400).json({
       ok: false,
       mensaje: `Ocurrio un error al momento de eliminar un usuario ${err}`
 });
   }
   return res.json({
     ok: true,
     mensaje: 'Registro borrado con exito',
     resp
   });
 });
 });
 
 module.exports = app;