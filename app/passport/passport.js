var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });
    passport.use(new LocalStrategy({
        passReqToCallback: true
    }, function (req, email, password, done) {

        var config = require('.././baseDatos/config');
        var db = mysql.createConnection(config);
        db.connect();

        db.query('SELECT * FROM Usuario WHERE correo = ?', email, function (err, rows, fields) {

            if (err) {
                throw err;
            }else {
                if (rows.length > 0) {
                    var usuario = rows[0];
                    if (bcrypt.compareSync(password, usuario.password)) {
                        console.log('encontrado y existente');
                        return done(null, {
                            id: usuario.idUser,
                            nombre: usuario.nombre,
                            correo: usuario.correo
                        });
                    }
                }
                return done(null, false, req.flash('authmessage', 'Email o password incorrecto'));
            }
        });
    }));
};
