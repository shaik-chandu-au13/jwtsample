const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

const User = require('../model/UserSchema');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

// register users

router.post('/register',async (req,res)=>{
    var hashpassword = bcrypt.hashSync(req.body.password,8);
    var user = await User.findOne({email:req.body.email});
    if(user){
        res.status(400).send("user already exist");
    }else{
    User.create({
        name:req.body.name,
        password:hashpassword,
        email:req.body.email,
        role:req.body.role?req.body.role:'User',
        isActive : true
    },(err,user)=>{
        if(err) throw err;
        res.status(200).send('Registration Success')
    })}
})


//get all users
router.get('/users',(req,res)=>{
    User.find({},(err,user)=>{
        if (err) throw err;
        res.status(200).send(user)

    })
})

module.exports = router