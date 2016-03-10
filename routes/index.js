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
});

module.exports = router;
