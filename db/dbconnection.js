const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


module.exports = con;