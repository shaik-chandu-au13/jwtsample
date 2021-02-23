const express = require('express');
const app = express();
const db = require('./config/db');
const port = process.env.PORT || 5000;
const cors = require('cors')

app.use(cors())

const AuthController = require('./controller/authController');

app.use('/api/auth',AuthController);

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log("listening on port: 5000")
})