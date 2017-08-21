var routes = {};

//GET Requests
routes.index_get = (req, res) => {
    res.render('index');
};
routes.login_get = (req, res) => {
    res.render('login');
};
routes.register_get = (req, res) => {
    res.render('register');
};

//POST Requests

module.exports = routes;