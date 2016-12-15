var express = require('express');
var search = require('./app/search');
var mongo = require('mongodb').MongoClient;
var app = express();

mongo.connect("mongodb://localhost:27017/queries", function(err,db){
    if(err) throw err;
    db.createCollection('latest',{capped: true, size: 100000, max: 10});
    search(app,db);
});

app.listen(8080, function(){
    console.log('App listening on port 8080');
});