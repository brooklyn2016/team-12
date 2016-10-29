var express = require('express');
var router = express.Router();
var bodyP = require('body-parser');
var stormpath = require('express-stormpath');


var mainController = require('./controllers/mainController');

//main page controller routes
router.get('/', mainController.getIndex);

module.exports = router;

