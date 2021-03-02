// database local connection
var mongoose = require('mongoose');
// mongodb+srv://admin:<password>@cluster0.ko9v1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0.ko9v1.mongodb.net/Mypoche?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(uri,{ useNewUrlParser: true },{ useUnifiedTopology: true })
