var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    password:String,
    
})

//define collection name and design of collection

mongoose.model('LoginUser',UserSchema);

module.exports = mongoose.model('LoginUser')