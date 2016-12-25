
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , search = require('./app/search.js')
  , path = require('path')
  , mongo = require('mongodb').MongoClient;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/public');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, '/public')));
});

mongo.connect("mongodb://apps:90gtWotJNqzSWz0njgXfwb3mNq97SnGhUpUnHebXeBMlEognRyH3Goh4Tuo9VrTkQnBJXTOGuO8f2pquQnXZ7Q==@apps.documents.azure.com:10250/img?ssl=true", function (err, db){
    if(err) throw err;
    db.createCollection('latest',{capped: true, size: 100000, max: 10});
    search(app,db);
});

app.get('/', function(req,res){
   res.render('index');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
