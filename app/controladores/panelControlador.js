var mysql = require('mysql');
var config = require('.././baseDatos/config');
var correo;

module.exports = {
  getUserPanel: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();
    var empresas = [];

    var consulta = "SELECT DISTINCT u.nombre , tmp.tipo ,tmp.nomEmpr,tmp.idEmpr from Usuario u, (SELECT t.idUser , t.tipo , e.nombre as nomEmpr , e.idEmpr FROM trabaja t , Empresa e where t.idEmpr = e.idEmpr)tmp where u.idUser = tmp.idUser AND u.idUser = ?";
    db.query(consulta, [req.user.id], function (err, resultado, fields) {
      if (err) {
        throw err;
      } else {
        console.log('primera Vez GetPanel');
        console.log(resultado);
        if (resultado.length > 0) {
          resultado.forEach((elem, index) => {
            console.log('entrando forEachl');
            db.query('SELECT idEmpr,idTemp,nombreTemporada,fechaIni,fechaFin from Temporada where idEmpr = ?', elem.idEmpr, function (err, result, fields) {
              if (err) {
                throw err;
              } else {
                var empresa = {
                  nombre: elem.nombre,
                  tipo: elem.tipo,
                  nomEmpr: elem.nomEmpr,
                  idEmpr: elem.idEmpr,
                  temporadas: result
                }
                empresas.push(empresa);
                if (index == resultado.length - 1) {
                  return res.render('users/panel', {
                    estaAutentificado: req.isAuthenticated(),
                    user: req.user,
                    empresas: empresas
                  });
                }

              }
            });
          });
        } else {
          console.log('************************* paso por aqui la primera Vez');
          res.render('users/panel', {
            estaAutentificado: req.isAuthenticated(),
            user: req.user,
            empresas: empresas
          });
        }

      }

    });

  },
  eliminarEmpresa: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();
    db.query('DELETE from trabaja  where trabaja.idEmpr = ?', [req.body.idEmpr], function (err, resultado, fields) {
      if (err) {
        throw err;
      } else {
        db.query('DELETE from administra where idEmpr = ?', [req.body.idEmpr], function (err, resultado, fields) {
          if (err) {
            throw err;
          } else {
            db.query('DELETE from Temporada where idEmpr = ?', [req.body.idEmpr], function (err, resultado, fields) {
              if (err) {
                throw err;
              } else {
                db.query('DELETE from Empresa where idEmpr = ?', [req.body.idEmpr], function (err, resultado, fields) {
                  if (err) {
                    throw err;
                  }
                });
              }
            });
            res.redirect('/users/panel');
          }
        });

      }
    });
  },
  adicionarEmpresa: function (req, res, next) {
    var Empresa = {
      nombre: req.body.nombreEmpresa,
      idUser: req.user.id,
    };
    var idEmpresa;
    var idTemporada;
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO Empresa SET ?', Empresa, function (err, resultEmpresa, fields) {
      if (err) {
        throw err;
      } else {
        idEmpresa = resultEmpresa.insertId;
        var Temporada = {
          idEmpr: resultEmpresa.insertId,
          nombreTemporada: 'Temporada Por Defecto',
          fechaIni: '2016-11-01',
          fechaFin: '2017-11-01'
        };
        db.query('INSERT INTO Temporada SET ?', Temporada, function (err, resultTemporada, fields) {
          if (err) {
            throw err;
          } else {
            idTemporada = resultTemporada.insertId;
            var bd = mysql.createConnection(config);
            bd.connect();
            for (var i = 1; i <= 5; i++) {
              var trabaja = {
                idPre: i,
                idUser: req.user.id,
                idEmpr: idEmpresa,
                idTemp: idTemporada,
                tipo: 'Jefe'
              };
              bd.query('Insert into trabaja SET ?', trabaja, function (err, resu, fields) {
                if (err) {
                  throw err;
                }
              });
            }
            bd.end();
            console.log("llega al final");
            db.end();
            return res.redirect('/users/panel');
          }
        });


      }
    });


  },
  adicionarTemporada: function (req, res, next) {
    var idTemporada;
    var idPlanilla;
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO Temporada SET ?', req.body, function (err, result, fields) {
      if (err) {
        throw err;
      } else {
        idTemporada = result.insertId;
        var db2 = mysql.createConnection(config);
        db2.connect();
        for (var i = 1; i <= 5; i++) {
          var trabaja = {
            idPre: i,
            idUser: req.user.id,
            idEmpr: req.body.idEmpr,
            idTemp: idTemporada,
            tipo: 'jefe'
          };
          var planilla = {
            idPre: i,
            montoAsignado: 10000
          };
          var administra;
          db.query('Insert into trabaja SET ?', trabaja, function (err, res, fields) {
            if (err) {
              throw err;
            }
          });
          db.query('Insert into Planilla SET ?', planilla, function (err, rest, fields) {
            if (err) {
              throw err;
            } else {
              idPlanilla = rest.insertId;
              administra = {
                idEmpr: req.body.idEmpr,
                idPlanilla: idPlanilla,
                idTemp: idTemporada
              };
              db2.query('Insert into administra SET ?', administra, function (err, res, fields) {
                if (err) {
                  throw err;
                }
              });
            }
          });
        }
        console.log("llega al final");
        db.end();
        return res.redirect('/users/panel');

      }
    });


  }
};
