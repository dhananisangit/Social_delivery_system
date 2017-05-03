var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login.ejs');
});

router.get('/register', function(req,res,next){
	res.render('register.ejs')
})

module.exports = router;
