var mongoose = require('mongoose');



var priceschema = new mongoose.Schema({
    email:String,
    catogery:String,
    amount:Number,
    createdAt:Date,    
    
});





//define collection name and design of collection

mongoose.model('Price',priceschema);

module.exports = mongoose.model('Price')