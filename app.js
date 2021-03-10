const express = require('express');
const app = express();
const db = require('./config/db');
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const User = require('./model/UserSchema');
const  session = require('express-session');
const auth = require('./controller/auth');
console.log(User)

app.use(session({ secret: 'sess_secret', cookie: { maxAge: 60000 }}));
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/")));

app.set('view engine','hbs')


app.get('/signup',(req, res) =>{
    res.render('signup')
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
app.post('/signup',async (req,res)=>{
    var hashpassword = bcrypt.hashSync(req.body.password,8);
    var hashpasswordConfirmation = bcrypt.hashSync(req.body.passwordConfirmation,8);
    var user = await User.findOne({email:req.body.email});
    if(user){
        res.status(400).send("user already exist");
    }else{
    User.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone,        
        password:hashpassword,
        passwordConfirmation:hashpasswordConfirmation
        
    },(err,user)=>{
        if(err) throw err;
        res.status(200).redirect('/login')
        
    })}
})

app.get('/login',(req, res) =>{
    res.render('login')
})

app.post('/login',(req, res)=>{
        console.log(req.body)
        User.findOne({email:req.body.email},(err,data) => {
        if(err) return res.status(500).send("Error while Login");
        // in case user not found
        console.log(data);
        if(!data) return res.redirect('/login');
        else{
            // compare password if user found
            // (userinput, password in db)
            const passIsValid = bcrypt.compareSync(req.body.password,data.password);
            // if password not match
            if(!passIsValid) return res.redirect('/login');
            // generate token
            // (tell on which unqiue key, secret, expire time(3600 1 hrs))
            req.session.userID=data._id
            return res.redirect('/userDetail')
            
        }
    })

})
app.get('/userDetail',auth ,(req, res) => {
    User.findOne({_id:req.session.userID},(e,d)=>{
        return res.json(d)
    })
})
app.get('/chart',auth,(req,res)=>{
    res.sendFile(__dirname + "/chart.html");
    // res.sendFile(__dirname + "/style.css")
})
app.listen(port,()=>{
    console.log("listening on port: 5000")
})