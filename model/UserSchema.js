var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,

    phone:Number,
    password:String,
    passwordConfirmation:String,
    
})


//define collection name and design of collection

mongoose.model('LoginUser',UserSchema);

module.exports = mongoose.model('LoginUser')