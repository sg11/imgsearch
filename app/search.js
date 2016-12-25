var https = require('https');
var request = require('request');

module.exports = function(app,db){
    app.get('/search/:query', function(req,res){
        res.setHeader('Access-Control-Allow-Origin', 'http://sgimg.azurewebsites.net')
        var query = req.params.query;
        var offset = req.query.offset;
        var pageSize = 16;
        var searchPath = "https://api.gettyimages.com/v3/search/images?phrase="+query;
        searchPath += "&page_size=" + pageSize;
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
            for(var i = 0; i < 16; i++){
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
        res.setHeader('Access-Control-Allow-Origin', 'http://sgimg.azurewebsites.net')
        findLatest(db,res);
    });
};

function saveQuery(query,db){
    var collection = db.collection('latest');
    collection.update(
        {"term": query },
        {
            "term": query,
            "when": new Date().toJSON()
        },
        { "upsert": true }
    );
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
        res.send(documents);
    });
}