var express = require('express');
var router = express.Router();

var passport = require('passport');

var controladores = require('.././controladores');
var authMiddleware = require('.././middleware/auth');

router.get('/', controladores.homeControles.index);

router.get('/crearProyecto', function (req, res, next) {

    return res.render('partes/crearProyecto');
});
router.get('/verPresupuesto', function (req, res, next) {
    return res.render('users/presupuesto');
});
router.post('/verEmpresa', function (req, res, next) {
    console.log('entrando a GET verEmpresa');
    console.log(req.body);
    res.redirect('/users/panel');
});
router.get('/login', controladores.homeControles.index);
router.get('/registro', controladores.homeControles.index);


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index.html',{titulo  : 'EXPRESS'});
// });

router.post('/users/registro', function (req, res, next) {
    console.log('Imprimiendo el cuerpo ENVIADO ' + req.body.nombre);

    res.json({ hola: 'HOLA desde El servidor' });
});


// OFICIALLLLLLL

router.get('/auth/signup', controladores.userControlador.getSignUp);
router.post('/auth/signup', controladores.userControlador.postSignUp);

router.get('/auth/signin', controladores.userControlador.getSignIn);

router.post('/auth/signin', passport.authenticate('local', {
    successRedirect: '/users/panel',
    failureRedirect: '/auth/signin',
    failureFlash: true
}));

router.get('/auth/logout', controladores.userControlador.logout);
router.get('/users/panel', authMiddleware.isLogged, controladores.panelControlador.getUserPanel);


router.post('/adicionarEmpresa', authMiddleware.isLogged, controladores.panelControlador.adicionarEmpresa);
router.post('/eliminarEmpresa', authMiddleware.isLogged, controladores.panelControlador.eliminarEmpresa);

router.post('/adicionarTemporada', authMiddleware.isLogged, controladores.panelControlador.adicionarTemporada);


router.get('/users/panel/:idEmpr/:idTemp', authMiddleware.isLogged, controladores.temporadaControlador.getPanelTemporada);
router.post('/users/panel/temporada', authMiddleware.isLogged, controladores.temporadaControlador.postPanelTemporada);

router.post('/users/panel/temporada/adicionarEmpleado', authMiddleware.isLogged, controladores.temporadaControlador.adicionarEmpleado);

router.get('/users/panel/:idEmpr/:idTemp/:idPre', authMiddleware.isLogged, controladores.presupuestoControlador.getPanelPresupuesto);


module.exports = router;
