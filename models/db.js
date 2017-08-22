var mysql = require('mysql2');
var bcrypt = require('bcrypt');
var async = require('async');
class DB {
    constructor (host, dbusername, dbpassword, dbname){
        this._host = host;
        this._dbusername = dbusername;
        this._dbpassword = dbpassword;
        this._dbname = dbname;
        var con = mysql.createConnection({
            host: this._host,
            user: this._dbusername,
            password: this._dbpassword,
            database: this._dbname 
        });
        con.connect((err) => {
            if(err) return false;
        });
        this.con = con;
    }
    createUser(req, res){
        var username = req.body.username;
        var password = req.body.password;
        var city = req.body.city;
        var name = req.body.name;
        let hash = bcrypt.hashSync(password, 10);
        let sql = "INSERT INTO `users`(`id`, `username`, `password`, `name`, `city`) VALUES ('','"+ username +"','"+ hash +"','"+ name +"','"+ city +"')";
        this.con.query(sql, (err, result)=>{
            if(err) throw err;
            res.redirect('/login');
        });
    }
    checkUser(req, res){
        var username = req.body.username;
        var password = req.body.password;
        console.log(username + " " + password);
        let sql = "SELECT * FROM `users` WHERE username='" + username + "'";
        return this.con.query(sql, (err, result, fields)=>{
            if(err) throw err;
            if(result.length === 1){
                if(bcrypt.compareSync(password, result[0].password)) {    
                    req.session.ids = result[0].id;
                    req.session.username = result[0].username;
                    res.redirect('/profile');
                }else{
                    res.redirect('/login?error=1');
                }
            }else{
                res.redirect('/login?error=1');
            }
        })
    }
}
module.exports = DB;