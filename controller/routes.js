var db = require('../models/db.js');
var routes = {};
var database = new db('localhost', 'root', '', 'test');

//GET Requests
routes.index_get = (req, res) => {
    if(req.session.username){
        res.redirect('/profile');
    }else{
    res.render('index');}
};
routes.login_get = (req, res) => {
    if(req.session.username){
        res.redirect('/profile');
    }else{
    if(req.query != undefined)
        res.render('login', {error : req.query.error});
    else
        res.render('login');
    }
};
routes.register_get = (req, res) => {
    if(req.session.username){
        res.redirect('/profile');
    }else{
    res.render('register');}
};
routes.profile_get = (req, res) =>{
    if(!req.session.username){
        res.redirect('/login?error=2');
    }
    res.render('profile', {data : req.session});
};
routes.logout_get = (req, res) =>{
    req.session.destroy(function(err) {
        res.redirect('/');
    });
};
routes.addnews_get = (req, res) => {
    if(!req.session.username){
        res.redirect('/');
    }else{
    res.render('addnews');}
};
routes.news_get = (req, res) => {
    database.getAllNews(req, res);
};
routes.newsid_get = (req, res) => {
    database.getNewsById(req, res);
};
//POST Requests
routes.register_post = (req, res) => {
    if(req.session.username){
        res.redirect('/profile');
    }else{
    database.createUser(req, res);}
};
routes.login_post = (req, res) => {
    if(req.session.username){
        res.redirect('/profile');
    }else{
    database.checkUser(req, res);}
};
routes.addnews_post = (req, res) => {
    if(!req.session.username){
        res.redirect('/login');
    }else{
    database.addNews(req, res);}
};
module.exports = routes;