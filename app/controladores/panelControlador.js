var mysql = require('mysql');
var config = require('.././baseDatos/config');
var correo;
module.exports = {
  getUserPanel: function (req, res, next) {

    var db = mysql.createConnection(config);
    db.connect();
    db.query('select nombre,idEmpr from Empresa where idUser = ?', [req.user.id], function (err, resultado, fields) {
      if (err) {
        throw err;
      } else {
        db.end();
        console.log(resultado);
        res.render('users/panel', {
          estaAutentificado: req.isAuthenticated(),
          user: req.user,
          empresas: resultado
        });
      }
    });

  },
  eliminarEmpresa: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();
    db.query('DELETE from Empresa where idEmpr = ?', [req.body.idEmpr], function (err, resultado, fields) {
      if (err) {
        throw err;
      } else {
        res.redirect('users/panel');
      }
    });

  },
  adicionarEmpresa: function (req, res, next) { 
    console.log('Entrando a Adicionar Empresa');
    console.log(req.body);
    var Empresa = {
      nombre: req.body.nombreEmpresa,
      idUser: req.user.id,
    };

    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO Empresa SET ?', Empresa, function (err, rows, fields) {
      if (err) {
        throw err;
      } else {
        req.flash('info', 'Empresa Adicionada');
        db.end();
        return res.redirect('/users/panel');
      }
    });

  }
};
