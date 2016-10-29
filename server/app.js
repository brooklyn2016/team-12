var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var promise = require('pg-promise');
var exphbs = require('exphbs');
var cookieParser = require('cookie-parser');
var stormpath = require('express-stormpath');

var app = express();

var server = require('http').Server(app);
var router = require('./router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('./public'));

app.set('trust proxy', true);
app.set('view engine', 'hbs');

app.get('/', router);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3000, function(){
	console.log('App listening for requests on port 3000');
})
