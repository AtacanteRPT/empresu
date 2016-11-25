var mysql = require('mysql');
var config = require('.././baseDatos/config');
module.exports = {
  getPanelTemporada: function(req, res , next){
      res.render('users/temporada', {
          estaAutentificado: req.isAuthenticated(),
          user: req.user
        });
  }
};
