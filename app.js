const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.listen(3000,()=>{
    console.log("server is running on the 3000 port...");
});

const home = require('./routes/index');
const login = require('./routes/login');
const main = require('./routes/main');
const signup = require('./routes/signup');

app.use(express.static(__dirname + '/public'));
app.use('/', home);
app.use('/',login);
app.use('/',main);
app.use('/',signup);