var db = require('../models/db.js');
var routes = {};
var database = new db('localhost', 'root', '', 'test');

//GET Requests
routes.index_get = (req, res) => {
    res.render('index');
};
routes.login_get = (req, res) => {
    if(req.query != undefined)
        res.render('login', {error : req.query.error});
    else
        res.render('login');
};
routes.register_get = (req, res) => {
    res.render('register');
};

//POST Requests
routes.register_post = (req, res) => {
    database.createUser(req.body.username, req.body.password, req.body.name, req.body.city, res);
};
routes.login_post = (req, res) => {
    database.checkUser(req.body.username, req.body.password, res);

};
module.exports = routes;