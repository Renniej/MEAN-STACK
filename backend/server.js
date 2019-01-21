var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
const app = express();


var issueRoute = require('./routes/issueRoute');

mongoose.connect('mongodb://localhost/issues', {useNewUrlParser: true});

const connection = mongoose.connection;

app.use(cors()); //find out what exactly this does
app.use(bodyParser.json());




app.use('/', issueRoute);



connection.once('open', function(){
    console.log("Connection to mongo database has been established!");
});

app.listen(4000, function(){

    console.log("Express server is running on port 4000!");

})