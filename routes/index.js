var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { 
  	title: 'angular-components', 
  	componentsList: [
  		{
  			name: 'ksh-table',
  			link: '/app/kshTable'
  		}
  	]
  });
  
	// res.render('./../webapp/build/home', {
	// 	title: 'angular-components'
	// });
});

router.get('/redirect', function(req, res, next) {
  res.render('redirect', {
    title: '重定向页面'
  });
});

module.exports = router;
