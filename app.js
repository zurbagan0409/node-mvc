//Init
var express = require('express');
var routes = require('./controller/routes.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
//Middleware
app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(session(
    {
    secret: "eruwehwergjerpgoehrgiu" ,
    cookie:{
        expires: 30 * 60 * 1000
    } 
}));
//Routing
//GET
app.get('/', routes.index_get);
app.get('/login', routes.login_get);
app.get('/register', routes.register_get);
app.get('/profile', routes.profile_get);
app.get('/logout', routes.logout_get);
app.get('/addnews', routes.addnews_get);
app.get('/news', routes.news_get);
app.get('/news/:id', routes.newsid_get);
//POST
app.post('/register', urlencodedParser, routes.register_post);
app.post('/login', urlencodedParser, routes.login_post);
app.post('/addnews', urlencodedParser, routes.addnews_post);
//Listen
app.listen(3000, ()=>{
    console.log("Listening to port " + 3000);
});

module.exports = app;