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

app.use(express.static('./public'));

var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(stormpath.init(app, {
  web: {
    login: {
      enabled: true,
      nextUri: "/quest_of_day"
    }
  }
}));

app.set('trust proxy', true);
app.set('view engine', 'hbs');

app.get('/', router);
app.get('/dashboard', stormpath.loginRequired, router);
app.get('/body-systems', stormpath.loginRequired, router);
app.get('/friends', stormpath.loginRequired, router);
app.get('/quest_of_day', stormpath.loginRequired, router);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3000);

// Stormpath will let you know when it's ready to start authenticating users.
app.on('stormpath.ready', function () {
  console.log('Stormpath Ready at port 3000!');
});
