const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');

require('dotenv').config();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const mysqlOption = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

const sessionStore = new MySQLStore(mysqlOption);

router.use(session({
    secret: process.env.KEYBOARDCAT,
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

const connection = mysql.createConnection(mysqlOption);

connection.connect(function(err) {
    if (err) throw err;
    console.log("database is connected!");
});

router.get('/login',(req,res)=>{
    res.render("login.ejs");
});


router.post('/loginPostRequest', (req, res) => {
    let userName = req.body.id_input;
    let pw = req.body.pw_input;
    if(userName && pw){
        connection.query("SELECT * FROM login WHERE nickname = ? AND pw = ?", [userName, pw], (error, rows,results) => {
            if (error) throw error;
            if(rows.length >0){
                req.session.loggedin = true;
				req.session.username = userName;
                req.session.save(()=>{
                    res.redirect('/a');
                });
            }
            else{
                console.log("you failed to login");
                /**
                 * alert modal
                 */
                res.redirect('/login');
            }
        });
    }
    else{
        res.redirect('/login');
    }
});

router.post('/logout',(req,res)=>{
    if(req.session.loggedin){
        req.session.loggedin = false;
    }
})

module.exports = router;