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
        var username = this.con.escape(req.body.username);
        var password = req.body.password;
        var city = this.con.escape(req.body.city);
        var name = this.con.escape(req.body.name);
        if(password.length < 8){
            res.redirect('/register?error=passlength');
        }else{
        let hash = bcrypt.hashSync(password, 10);
        var sql2 = "SELECT * FROM `users` WHERE username=" + username + "";
        this.con.query(sql2, (err, result, field)=>{
            if(err) throw err;
            if(result.length > 0){
                res.redirect('/register?error=already');
            }else{
                let sql = "INSERT INTO `users`(`id`, `username`, `password`, `name`, `city`) VALUES ('',"+ username +",'"+ hash +"',"+ name +","+ city +")";
                this.con.query(sql, (err, result)=>{
                    if(err) throw err;
                    res.redirect('/login');
                });
            }
        });
        
    }
    }
    checkUser(req, res){
        var username = this.con.escape(req.body.username);
        var password = req.body.password;
        let sql = "SELECT * FROM `users` WHERE username=" + username + "";
        this.con.query(sql, (err, result, fields)=>{
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
        });
    }
    addNews(req, res){
        var title = req.body.title;
        var body = req.body.descr;
        let sql = "INSERT INTO `news`(`id`, `title`, `descr`) VALUES ('','" + title + "','" + body + "')";
        this.con.query(sql, (err, result)=>{
            if(err) throw err;
            res.redirect('/news');
        });
    }
    getNewsById(req, res){
        var id = req.params.id;
        let sql = "SELECT * from news WHERE id = " + id;
        this.con.query(sql, (err, result, field)=>{
            if(err) throw err;
            else{
                res.render('newsid', {data : result[0]});
            }
        });
    }
    getAllNews(req, res){
        let sql = "SELECT * from news";
        this.con.query(sql, (err, result, field)=>{
            if(err) throw err;
            else{
                res.render('news', {news : result});
            }
        });
    }
    getAllUsers(req, res){
        let sql = "SELECT * from users";
        this.con.query(sql, (err, result, field)=>{
            if(err) throw err;
            else{
                res.render('users', {users : result, session : req.session});
            }
        });
    }
    checkChatIfExists(req, res){
        var id1 = Math.max(req.params.id1, req.params.id2);
        var id2 = Math.min(req.params.id1, req.params.id2);
        let sql = "SELECT * from chats WHERE user1_id='" + id1 + "' AND user2_id='" + id2 + "'";
        this.con.query(sql, (err, result, field) => {
            if(err) throw err;
            else{
                if(result.length === 1){
                    console.log("asdasd");
                    res.redirect('/chat/' + result[0].id);
                }else{
                    sql = "INSERT INTO chats (id, user1_id, user2_id) VALUES ('', '" + id1 + "', '" + id2 + "' )";
                    this.con.query(sql, (err, result) => {
                        if(err) throw err;
                        else{
                            res.redirect('/chat/' + id1 + '/' + id2);
                        }
                    });
                }
            }
        });
    }
    addMessage(data) {
        let sql = "INSERT INTO messages (id, text, chat_id, date, sender) values ('', '" + data.message + "', '" + data.chat + "', NOW(), '" + data.sender + "')";
        this.con.query(sql, (err, result) => {
            if(err) throw err;
            else{
                console.log("success");
            }
        });
    }
    getAllMessages(req, res){
        var id = req.params.id;
        let sql = "SELECT * from messages WHERE chat_id = " + id + " ORDER BY id";
        this.con.query(sql, (err, result, field) => {
            if(err) throw err;
            res.render('chat', {session : req.session, chat_id : req.params.id, messages : result});
        });
    }
}
//
module.exports = DB;