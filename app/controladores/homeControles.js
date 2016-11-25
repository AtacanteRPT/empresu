module.exports = {

  index: function (req,res, next){
    console.log('Imprimiendo Req en el index');
    console.log(req);
    res.render('index',{
      titulo : 'Empresu',
      estaAutentificado: req.isAuthenticated(),
      user: req.user
    });
  }
}
