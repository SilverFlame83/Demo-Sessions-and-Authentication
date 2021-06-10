//using session
const express = require('express');
const expressSession = require('express-session');

const app = express();
app.use(expressSession({
    secret:'my rando secret',
    resave: false,
    saveUninitialized:false,
    cookie:{secure:false}
}));

app.get('/', (req,res)=>{
    res.send('Hello')
})

app.listen(3000);