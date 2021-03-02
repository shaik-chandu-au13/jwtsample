const express = require('express');
const app = express();
const db = require('./config/db');
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const User = require('./model/UserSchema');

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/")));

app.get('/signup',(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
    // res.sendFile(__dirname + "/style.css")
})

app.get('/',(req,res)=>{
    res.send("hello world")
})
app.get('/users',(req,res)=>{
    User.find({},(err,user)=>{
        if (err) throw err;
        res.status(200).send(user)

    })
})
app.listen(port,()=>{
    console.log("listening on port: 5000")
})