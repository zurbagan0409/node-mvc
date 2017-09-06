//Init
var express = require('express');
var routes = require('./controller/routes.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 3000);
var db = require('./models/db.js');
var database = new db('localhost', 'root', '', 'test');
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
app.get('/users', routes.users_get);
app.get('/chat/:id1/:id2', routes.chat_prepair_get);
app.get('/chat/:id', routes.chat_get)
//POST
app.post('/register', urlencodedParser, routes.register_post);
app.post('/login', urlencodedParser, routes.login_post);
app.post('/addnews', urlencodedParser, routes.addnews_post);

io.on('connection', function (socket) {
    console.log("User connected");
    socket.on('disconnect', (data) => {
        console.log("User disconnected.");
    });
    //Send Message
    socket.on('send message', (data)=> {
        database.addMessage(data);
        io.sockets.emit("new message on" + data.chat, data);
    });
});
module.exports = app;