var https = require('https');
var request = require('request');

module.exports = function(app,db){
    app.get('/search/:query', function(req,res){
        var query = req.params.query;
        var offset = req.query.offset;
        var searchPath = "https://api.gettyimages.com/v3/search/images?phrase="+query;
        if(offset){
            searchPath += "&page=" + offset;
        }
        var options = {
            url: searchPath,
            headers: {
            "Api-Key":process.env.API_KEY
            }
        };
        request(options, function(err, response, body){
           var arr = [];
           if(err) throw err;
           var results = JSON.parse(body);
            for(var i = 0; i < 10; i++){
                arr.push({
                  "thumbnail-url": results.images[i].display_sizes[0].uri,
                  "snippet": results.images[i].caption,
                  "page-url": "https://www.gettyimages.com/photos/"+results.images[i].id
                });
            }
           res.send(arr);
           saveQuery(query,db);
        });
    });
    
    app.get('/latest',function(req,res){
        findLatest(db,res);
    });
};

function saveQuery(query,db){
    var collection = db.collection('latest');
    var obj = {"term":query,"when":new Date().toJSON()};
    collection.insert(obj,function(err,data){
        if(err) throw err;
    });
}

function findLatest(db,res){
    var collection = db.collection('latest');
    collection.find({
    },{
        term: 1,
        when: 1,
        _id:0
    }).toArray(function(err,documents){
        if(err) throw err;
        console.log(documents);
        res.send(documents);
    });
}
