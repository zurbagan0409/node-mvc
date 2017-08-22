//Init
var express = require('express');
var routes = require('./controller/routes.js');
var bodyParser = require('body-parser');
var app = express();
//Middleware
app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//Routing
//GET
app.get('/', routes.index_get);
app.get('/login', routes.login_get);
app.get('/register', routes.register_get);
//POST
app.post('/register', urlencodedParser, routes.register_post);
app.post('/login', urlencodedParser, routes.login_post);
//Listen
app.listen(3000, ()=>{
    console.log("Listening to port " + 3000);
});

module.exports = app;