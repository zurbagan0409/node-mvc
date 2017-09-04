//Init
var express = require('express');
var routes = require('./controller/routes.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 3000);
var number_of_users = 0;
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
app.get('/users', routes.userslist_get);
app.get('/chat/:id1/:id2', routes.chat_get);
//POST
app.post('/register', urlencodedParser, routes.register_post);
app.post('/login', urlencodedParser, routes.login_post);
app.post('/addnews', urlencodedParser, routes.addnews_post);
//Listen NOT WORKING CAUSE I ADDED LISTEN AFTER CREATING SOCKETS
/*app.listen(3000, ()=>{
    console.log("Listening to port " + 3000);
});*/

io.on('connection', function (socket) {
    number_of_users++;
    console.log("User connected. Total number of users = " + number_of_users);
    socket.on('disconnect', (data) => {
        number_of_users--;
        console.log("User disconnected. Total number of users = " + number_of_users);
    });
    //Send Message
    socket.on('send message', (data)=> {
        io.sockets.emit('new message from ' + data.user1 + 'to' + data.user2, {msg: data.message, sender : data.sender});
        console.log(data);
    });
});
module.exports = app;