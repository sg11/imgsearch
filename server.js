var express = require('express');
var search = require('./app/search');
var mongo = require('mongodb').MongoClient;
var app = express();

mongo.connect("mongodb://localhost:27017/queries", function(err,db){
    if(err) throw err;
    db.createCollection('latest',{capped: true, size: 100000, max: 10});
    search(app,db);
});

app.use(express.static(__dirname + '/public'));
app.set('views', './public');

app.get('/', function(req,res){
   res.render('index');
});

app.listen(8080, function(){
    console.log('App listening on port 8080');
});