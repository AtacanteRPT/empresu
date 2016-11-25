var express = require('express'),
 routes = require('../routes/routes');

module.exports = function (app) {
  // app.use('/', router);
  app.use('/', routes);
};

// router.get('/', function (req, res, next) {
//   var articles = [new Article(), new Article()];
//     res.render('index', {
//       title: 'Generator-Express MVC',
//       articles: articles
//     });
// });
