//Init
var express = require('express');
var routes = require('./controller/routes.js');
var app = express();
//Middleware
app.set('view engine', 'ejs');
//Routing
app.get('/', routes.index_get);
app.get('/login', routes.login_get);
app.get('/register', routes.register_get);
//Listen
app.listen(3000, ()=>{
    console.log("Listening to port " + 3000);
});