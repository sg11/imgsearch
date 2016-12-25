var query = '';
var offset = 0;
$(document).ready(function(){
    $("#form").submit(function(e){
      e.preventDefault();
      query = document.getElementById('query').value;
      $("#next").removeClass('invisible');
      searchImages(1,query);
    });
});

function searchImages(num,query){
  document.getElementById('query').value = query;
  if (num == 1) {
    $("#prev").addClass('invisible');
  }
  $("#next").removeClass('invisible');
  $("#results").html('');
  var i = 0;
  var url = "https://image-sng11.c9users.io/search/";
  url += query;
  url += "?offset=" + num;
  $.getJSON(url, function(data){
    data.forEach(function(item){
      if (item["snippet"] == null){
        var snippet = '<em>Caption Not Available</em>';
      } else {
        var snippet = item["snippet"];
      }
      i += 1;
      if (i == 5 || i == 9 || i == 13){
        $("#results").append("</div><div class='row'>");
      }
      $("#results").append("<a href='" + item["page-url"] + "' class='col-md-3'><div class='thumbnail col-md-4'><img src='" + item["thumbnail-url"] + "' class='img-responsive center-block'><div class='caption'>" + snippet + "</div></div></a>");
    });
    $("#results").append("</div>");
  });
}

function goNext() {
  offset += 1;
  $("#prev").removeClass('invisible');
  searchImages(offset,query);
}

function goPrev() {
  offset -= 1;
  searchImages(offset,query);
}

function showLatest() {
  var url = "https://image-sng11.c9users.io/latest";
  $("#results").html('');
  $.getJSON(url, function(data){
    data.forEach(function(item){
      var term = item['term'];
      var when = item['when'];
      var dateObj = new Date(when);
      var date = dateObj.toDateString();
      var time = dateObj.toTimeString();
      $("#results").append("<div class='row text-left text-uppercase col-md-offset-2 latest' id='"+term+"' onclick=searchImages(1,this.id)><div class='col-md-3' style='float: left;'><h2>" + term + "</h2></div><div class='text-right' style='float: right;'><br>" + date + "<br>" + time + "</div></div>");
    });
  });
}

function surpriseMe() {
  var url = "https://image-sng11.c9users.io/latest";
  var search = Math.floor(Math.random()*10);
  $.getJSON(url, function(data){
    query = data[search]["term"];
    document.getElementById('query').value = query;
    offset = Math.floor(Math.random()*3)+1;
    searchImages(offset,query);
    offset > 1 ? $("#prev").removeClass('invisible') : $("#prev").addClass('invisible');
  });
}