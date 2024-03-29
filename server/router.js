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
	}

	res.render('dashboard', { name: name });
});

router.get('/body-systems', stormpath.getUser, function(req, res){
	if(req.user){ //check if logged in user or not
		name=(req.user.givenName);

	res.render('body_systems', { name: name });
	}
});

router.get('/quest_of_day', stormpath.getUser, function(req, res){
	if(req.user){
		name = (req.user.givenName);
	}

	res.render('quest_of_day', {name: name});
});

router.get('/sandwich', stormpath.getUser, function(req, res){
	if(req.user){
		name = (req.user.givenName);
	}
	res.render('sandwich', {name: name});
});

module.exports = router;

