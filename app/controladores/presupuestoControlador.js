var mysql = require('mysql');
var config = require('.././baseDatos/config');

var titulo2 = 'Probando NodeJS';
module.exports = {
  getDato: function(req,res,next){

      res.render('borrar',{titulo : titulo2, usuario : req.user});
  },
  postDato: function(req,res,next){
    

    var dato = req.body.titulo;
    titulo2 = dato;
    res.redirect('/borrar');
  }

};
