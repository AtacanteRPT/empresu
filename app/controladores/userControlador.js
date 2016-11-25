var mysql = require('mysql');
var bcrypt = require('bcryptjs');

module.exports = {
  getSignUp: function (req, res, next) {
    return res.render('users/signUp', { estaAutentificado: req.isAuthenticated()});
  },
  postSignUp: function (req, res, next) {
    var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(req.body.password, salt);

    var usuario = {
      nombre: req.body.nombre,
      password: password,
      correo: req.body.email,
      telefono : req.body.telefono
    };
    var config = require('.././baseDatos/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO Usuario SET ?', usuario, function (err, rows, fields) {
      if (err) {
        throw err;
      } else {
        req.flash('info', 'Se ha registrado correctamente, ya puede Iniciar secion');
        db.end();
        return res.redirect('/auth/signin');
      }
    });
  },
  getSignIn: function (req, res, next) {
    return res.render('users/signIn', { message: req.flash('info'),
    authmessage: req.flash('authmessage'),
    estaAutentificado: req.isAuthenticated() });
  },
  logout: function (req, res, next) {
    req.logout();
    res.redirect('/auth/signin');
  }
};
