var express = require('express');
var router = express.Router();
var bodyP = require('body-parser');
var stormpath = require('express-stormpath');


//main page controller routes
router.get('/', stormpath.getUser, function(req, res){
	var status = false;
	var name = "";

	if(req.user){
		status = true
		name = (req.user.givenName);
	}

	res.render('index', { name: name, status: status });
});


router.get('/dashboard', stormpath.loginRequired, stormpath.getUser, function(req, res){
	if(req.user){
		status = true
		name = (req.user.givenName);
		lastname = (req.user.lastName);
	}

	res.render('dashboard', { name: name });
});

module.exports = router;

