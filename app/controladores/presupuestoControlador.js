var mysql = require('mysql');
var config = require('.././baseDatos/config');

var titulo2 = 'Probando NodeJS';
module.exports = {
  getPanelPresupuesto: function (req, res, next) {
    var idEmpr = parseInt(req.params.idEmpr, 10);
    var idTemp = parseInt(req.params.idTemp, 10);
    var idPre = parseInt(req.params.idPre, 10);


    var db = mysql.createConnection(config);
    db.connect();
    db.query('SELECT nombre from tablaPresupuesto where idPre = ?', [idPre], function (err, result, fields) {
      if (err) {
        throw err;
      } else {
        db.end();
        console.log('idPresupuesto');
        console.log(result);
        var resultado = result;
        console.log(resultado);
        res.render('users/presupuesto', {
          estaAutentificado: req.isAuthenticated(),
          user: req.user,
          nombrePresupuesto : result
        });
      }
    });
  }

};
