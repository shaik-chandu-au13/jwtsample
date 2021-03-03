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
app.post('/register',async (req,res)=>{
    var hashpassword = bcrypt.hashSync(req.body.password,8);
    var user = await User.findOne({email:req.body.email});
    if(user){
        res.status(400).send("user already exist");
    }else{
    User.create({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        password:hashpassword
        
    },(err,user)=>{
        if(err) throw err;
        res.status(200).send('Registration Success')
    })}
})
app.get('/chart',(req,res)=>{
    res.sendFile(__dirname + "/chart.html");
    // res.sendFile(__dirname + "/style.css")
})
app.listen(port,()=>{
    console.log("listening on port: 5000")
})