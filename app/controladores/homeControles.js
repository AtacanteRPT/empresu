module.exports = {

  index: function (req,res, next){

    res.render('index',{
      titulo : 'Empresu',
      estaAutentificado: req.isAuthenticated(),
      user: req.user
    });
  }
}
