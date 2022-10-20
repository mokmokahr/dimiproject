const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const request = require('request');
const session = require('express-session');

require('dotenv').config();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//router.set('trust proxy', 1) 
router.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

let connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

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
    console.log("username: "+userName+"\npassword: "+pw);
    if(userName && pw){
        connection.query("SELECT * FROM login WHERE nickname = ? AND pw = ?", [userName, pw], function (error, rows,results) {
            if (error) throw error;
            if(results.length >0){
                console.log("results:"+results.length);
                req.session.loggedin = true;
				req.session.username = userName;
                res.redirect('/a');
            }
        });
    }
    else{
        res.redirect('/');
    }
});

module.exports = router;