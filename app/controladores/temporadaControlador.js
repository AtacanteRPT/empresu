var mysql = require('mysql');
var config = require('.././baseDatos/config');
module.exports = {
  getPanelTemporada: function (req, res, next) {
    var idEmpr = parseInt(req.params.idEmpr, 10);
    var idTemp = parseInt(req.params.idTemp, 10);


    var db = mysql.createConnection(config);
    db.connect();
    var consulta = 'select tp.nombre, tp.idPre , tmp.nombreTemporada from tablaPresupuesto tp , (SELECT t.idPre, te.nombreTemporada FROM trabaja t , Temporada te where (t.idTemp = te.idTemp) AND t.idEmpr = ? AND t.idTemp =? AND t.idUser = ? ) tmp where tp.idPre = tmp.idPre'
    db.query(consulta, [idEmpr, idTemp, req.user.id], function (err, result, fields) {
      if (err) {
        throw err;
      } else {
        res.render('users/temporada', {
          estaAutentificado: req.isAuthenticated(),
          user: req.user,
          presupuestos: result,
          idEmpr: idEmpr,
          idTemp: idTemp
        });
      }
    });
  },
  postPanelTemporada: function (req, res, next) {

    var redirect = '/users/panel/' + req.body.idEmpr + '/' + req.body.idTemp;
    // var db = mysql.createConnection(config);
    // db.connect();
    // db.query('insert into Planilla set ?', req.body, function (err, result, fields) {
    //   if (err) {
    //     throw err;
    //   } else {

    //   }
    // });
    res.send({ redirect: redirect });
  },
  adicionarEmpleado: function (req, res, next) {
    var redirect = '/users/panel/' + req.body.idEmpr + '/' + req.body.idTemp;
    console.log('empleado');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('select idUser from Usuario where correo = ?', req.body.correo, function (err, result, fields) {
      if (err) {
        throw err;
      } else {
        var empleado = {
          idEmpr : req.body.idEmpr,
          idPre :req.body.idPre,
          idTemp : req.body.idTemp,
          idUser : result[0].idUser,
          tipo : 'Empleado'
        }
        db.query('insert into trabaja SET ?', empleado, function (err, result, fields) {
          if (err) {
            throw err;
          } else {
            db.end();
            res.send({redirect : redirect});
          }
        });
      }
    });
  }
};
