var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('app', {
    title: 'angular-app'
  });
});

router.get('/redirect', function(req, res, next) {
  res.render('redirect', {
    title: '重定向页面'
  });
});

module.exports = router;
