const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../db/dbconnection');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/*
db.query("SELECT * FROM login" , function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});*/

router.get('/signup', (req, res) => {
    res.render("signup.ejs");
});

router.post('/sendSignupResult',(req,res) => {
    let signUpUserName = req.body.userNameRegister;
    let signUpPw = req.body.userPwRegister;
    let signUpNickName = req.body.nickNameRegister;
    db.query("INSERT INTO login (nickname,realname,pw) VALUES (?,?,?)",[signUpNickName,signUpUserName,signUpPw],() => {
        console.log("insert");
        res.redirect('/a');
    });
})

module.exports = router;