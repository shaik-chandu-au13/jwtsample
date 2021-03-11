const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./config/db');
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const User = require('./model/UserSchema');
const  session = require('express-session');
const auth = require('./controller/auth');
const Price = require('./model/priceschema');

//------------------------------------------- middlewares----------------------------------------------------------------

app.use(session({ secret: 'sess_secret', cookie: { maxAge: 60000 }}));
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'))

//------------------------------------------- set template engine-------------------------------------------

app.set('view engine','hbs')

// ------------------------------------------- root route -------------------------------------------

app.get('/',(req,res)=>{
    res.send("hello world")
})

// ------------------------------------------- get signup -------------------------------------------

app.get('/signup',(req, res) =>{
    res.render('signup')
})

// ------------------------------------------- post  signup -------------------------------------------

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

// ------------------------------------------- GET LOGIN -------------------------------------------


app.get('/login',(req, res) =>{
    res.render('login')
})

// ------------------------------------------- POST  LOGIN -------------------------------------------

app.post('/login',(req, res)=>{
        // console.log(req.body)
        User.findOne({email:req.body.email},(err,data) => {
        if(err) return res.status(500).send("Error while Login");
        // in case user not found
        // console.log(data);
        if(!data) return res.redirect('/login');
        else{
            // compare password if user found
            // (userinput, password in db)
            const passIsValid = bcrypt.compareSync(req.body.password,data.password);
            // if password not match
            if(!passIsValid) return res.redirect('/login');
            // else
            // generate token
            // (tell on which unqiue key, secret, expire time(3600 1 hrs))
            req.session.email=data.email
            req.session.userID=data._id
            // newschema.findOne({email:req.body.email},(err,data) => {
            return res.redirect('/display')
            
        }
    })

})
// -----------

app.post('/add',auth, (req, res) => {
   
    Price.create({
        email:req.session.email,
        catogery:req.body.category,
        amount:req.body.price,
        createdAt:Date.now()
        
        
    },(err,Price)=>{
        if(err) throw err;
        res.status(200).redirect('/display')
        
    })
    
  })

  app.get('/display', (req, res) => {

    // 
    Price.find({email:req.session.email},(err,data) => {
        if(err) return res.status(500).send("Error while Login");
        // in case user not found
        console.log(data);
        res.render('index', { quotes: data })

      
  })
})
// --------------------------------------------------delete----------------

// ------------------------------------------- GET USERDETAILS AFTER SIGNIN -------------------------------------------

app.get('/userDetail',auth ,(req, res) => {

    User.findOne({_id:req.session.userID},(e,d)=>{
        return res.json(d)
    })
})
app.get('/update',auth,async (req,res)=>{
    
    let id = mongoose.Types.ObjectId(req.query.id)
    let find = await Price.find({_id:id})
    // console.log(find)
    // console.log([...find[0]])
    res.render('update',{
        catogery:find[0].catogery,
        amount:find[0].amount,
        id:id
    })
})
app.post('/update',auth,async (req,res)=>{
    
    let id = mongoose.Types.ObjectId(req.query.id)
    let find = await Price.find({_id:id})
    // console.log(find)
    // console.log([...find[0]])
    find[0].catogery=req.body.catogery
    find[0].amount=req.body.amount
    await find[0].save()
    res.redirect("/display")

})

app.get('/delete',auth,async(req, res)=>{
    let id = mongoose.Types.ObjectId(req.query.id)
    await Price.findOneAndRemove({_id:id})
    res.redirect("/display")
})
// ------------------------------------------- get CHART -------------------------------------------


app.get('/chart',auth,(req,res)=>{
    res.sendFile(__dirname + "/chart.html");
    // res.sendFile(__dirname + "/style.css")
})

app.get('/userid',auth,(req,res)=>{
    console.log(req.session.userID)
    res.send(req.session.userID)

})


// ------------------------------------------- GET ALL USERS -------------------------------------------

app.get('/users',(req,res)=>{
    User.find({},(err,user)=>{
        if (err) throw err;
        res.status(200).send(user)

    })
})

// ------------------------------------------- LISTEN -------------------------------------------


app.listen(port,()=>{
    console.log("listening on port: 5000")
})