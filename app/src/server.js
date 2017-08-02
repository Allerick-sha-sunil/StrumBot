var express = require('express');
var app = express();
var root = process.cwd();
var http = require('http');

app.use(require('express-ajax'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/assets", express.static(__dirname + '/assets'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/html", express.static(__dirname + '/html'));
app.use("/js", express.static(__dirname + '/js'));


app.get('/', function (req, res) {

    res.sendFile('html/index.html',{root});
});

app.get('/dashboard', function (req, res) {
    res.sendFile('html/dashboard.html',{root});
});

app.get('/write', function (req, res) {
    res.sendFile('html/write.html',{root});
});

app.get('/search', function (req, res) {
    res.sendFile('html/search.html',{root});
});

function createTemplate(a){

	var x=a;
	
	var template=` <!DOCTYPE html>
<html lang="en">

  <head>
  	<script type="text/javascript">
    document.onreadystatechange = function(e)
    {
    if (document.readyState === 'complete')
    {
        if(localStorage.getItem('token')=='')
        {
          alert("Login or Signup to continue...")
          window.location.href = "http://strumbot.strange-quark.hasura.me/";
        }//dom is ready, window.onload fires later
    }
    };
    </script>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="StrumBot" content="">
    <meta name="Sowmiya Nagarajan" content="">
   
    <title>Home | StrumBot</title>
    <link rel="shortcut icon" href="images/logo.ico" />

    <!-- Bootstrap core CSS -->
    <link href="/css/bootstrap.css" rel="stylesheet">
    <link href="/css/image-effects.css" rel="stylesheet">
    <link href="/css/custom-styles.css" rel="stylesheet">
    <link href="/css/font-awesome.css" rel="stylesheet">
    <link href="/css/font-awesome-ie7.css" rel="stylesheet">

    <!-- Scripts -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!--
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/html5shiv.js"></script>
    <script src="/js/respond.min.js"></script>
    <script src="/js/bootstrap.js"></script>
    <script src="/js/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    -->

    <script type="text/javascript">
      $(function(){
      	var note_id=localStorage.getItem('note_id');
        $('#stars').click(function(){
          var old=document.getElementById("rating1").innerHTML;
          var objOff = $(this).offset();
          var x = objOff.left;
          var posx = event.pageX;
          var newX = posx - x;
          var w = $('#stars').width();
          var percentrating = newX/w;
          rating = w * percentrating;
          if($('#rating').length){
            $('#rating').width(rating);
          }else{
             $('#stars').append("<div id='rating'/>");
          $('#rating').css({width: rating});
          }
          var cleanpercent = percentrating + " ";
          cleanpercent = cleanpercent.slice(2, 4)/10;
          var count=localStorage.getItem('count');
          var t=count-1;
          old=old*t;
          old=cleanpercent+old;
          old=old/count;
          $('#rating_number').text(cleanpercent + "/10");
          $.ajax({
           url: 'http://data.strange-quark.hasura.me/v1/query',
           method: 'post',
           headers: {
           'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
           'Content-Type': 'application/json'
           },
           data: JSON.stringify({
           "type": "run_sql",
           "args": {
           "sql": "update article set count=count+1 where id="+note_id+";"
           }
           })
           }).done(function(data) {
           			$.ajax({
				           url: 'http://data.strange-quark.hasura.me/v1/query',
				           method: 'post',
				           headers: {
				           'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
				           'Content-Type': 'application/json'
				           },
				           data: JSON.stringify({
				           "type": "run_sql",
				           "args": {
				           "sql": "update article set rating="+old+" where id="+note_id+";"
				           }
				           })
				           }).done(function(data) {
				           	//alert("Rating changed");
				           	//location.reload();
				          });
          				});
        			})
      });
      window.onload=function(){
      	localStorage.setItem('note_id','`+x+`');
      	//alert(localStorage.getItem('note_id'));
      	var temp=localStorage.getItem('note_id');
      	//alert(temp);
      	$.ajax({
           url: 'http://data.strange-quark.hasura.me/v1/query',
           method: 'post',
           headers: {
           'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
           'Content-Type': 'application/json'
           },
           data: JSON.stringify({
           "type": "select",
           "args": {
           "table": "article",
           "columns": ["name","notes","artist","language","link","created","user_id","rating","count"],
           "where": {"id": temp}
           }
           })
           }).done(function(data) {
           $.ajax({
           url: 'http://data.strange-quark.hasura.me/v1/query',
           method: 'post',
           headers: {
           'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
           'Content-Type': 'application/json'
           },
           data: JSON.stringify({
           "type": "select",
           "args": {
           "table": "profile",
           "columns": ["username"],
           "where": {"user_id": data[0].user_id}
           }
           })
           }).done(function(data) {
           	var temp1 = document.getElementById("author");
            temp1.innerHTML="Authored by "+data[0].username;
           });
           var temp1 = document.getElementById("title");
           temp1.innerHTML=data[0].name;
           temp1 = document.getElementById("artist");
           temp1.innerHTML=data[0].artist;
           temp1 = document.getElementById("lang");
           temp1.innerHTML=data[0].language;
           temp1 = document.getElementById("link");
           temp1.href=data[0].link;
           temp1.innerHTML=data[0].link;
           temp1 = document.getElementById("notes");
           temp1.innerHTML=data[0].notes;
           temp1 = document.getElementById("time");
           temp1.innerHTML=data[0].created;
           localStorage.setItem('rating',data[0].rating);
           temp1 = document.getElementById("rating1");
           temp1.innerHTML=data[0].rating;
           localStorage.setItem('count', data[0].count);
           if(data[0].user_id==JSON.parse(localStorage.getItem('id')))
           {
           	temp1 = document.getElementById("wrap");
           	temp1.style.display='none';
           	temp1 = document.getElementById("rate_head");
           	temp1.style.display='none';
           	temp1 = document.getElementById("click_above");
           	temp1.style.display='none';
           	temp1 = document.getElementById("your_rating");
           	temp1.style.display='none';
           }
          });
      };
    </script>

  </head>

  <body>

      <div class="container" style="border: 5px">

      <div class="row">

        <div class="site-header spacing-t">

          <!-- Site Title -->
          <div class="col-md-3">
              <div class="site-name spacing-b">
                <h1> STRUMBOT</h1>
                <h6>Search, Rate and Share notes</h6>
              </div>
          </div>
      

          <!-- Dashboard -->
          <div class="col-md-2" style="padding-top: 7px;">
            <nav class="navbar pull-right" role="navigation">
            <div style="display: block;vertical-align: middle;text-align: center;">
            <button id="dash" title="Dashboard" class="btn btn-default" style="height: 45px; vertical-align: middle;"><i class="glyphicon glyphicon-th-large" style="padding-bottom: 14px; height: 25px;"></i></button>
            </div>
            </nav>
          </div>

           <div class="col-md-1" style="padding-top: 7px;">
            <nav class="navbar pull-right" role="navigation">
            <div style="display: block;vertical-align: middle;text-align: center;">
            <button id="write" title="Write" class="btn btn-default" style="height: 45px; vertical-align: middle;"><i class="glyphicon glyphicon-pencil" style="padding-bottom: 14px; height: 25px;"></i></button>
            </div>
            </nav>
          </div>

          <!-- Search Bar -->
          <div class="col-md-5">
            <nav class="navbar pull-right" role="navigation">
            <form class="navbar-form" role="search">
              <div class="input-group">
                <input id="search_text" type="text" class="form-control" placeholder="Search for song notes" name="q" style="height: 45px;"/>
                  <div class="input-group-btn">
                    <button id="search" class="btn btn-default" style="height: 45px;"><i class="glyphicon glyphicon-search" style="align-self: center; padding-bottom: 14px;  position: relative; height: 25px;"></i></button>
                  </div>
                </div>
            </form>
            </nav>
          </div>
          </div>

          <script>
            $("#search").click(function(e){
              e.preventDefault();
              var temp=$("#search_text").val();
              localStorage.setItem('search_text',temp);
              //window.location.href = "http://localhost:8080/search";
              window.location.href = "http://strumbot.strange-quark.hasura.me/search";
            });
          </script>

          <div class="col-md-1" style="padding-top: 7px;">
            <nav class="navbar pull-right" role="navigation">
              <div style="display: block;vertical-align: middle;text-align: center;">
                <button id="logout" class="btn btn-default" style="height: 45px; vertical-align: middle;">Log Out</button>
              </div>
            </nav>
          </div>
        </div>
        <hr>

        <div class="col-md-8">
          <h2 id="title" style="padding-bottom: 5px">
          </h2>
          <p id="author" style="color: #e24f43; padding-bottom: 15px"></p>
          <p id="notes"></p>
        </div>

        <div class="col-md-4">
          <h4>Artist</h4>
          <p id="artist"></p>
          <h4>Language</h4>
          <p id="lang"></p>
          <h4>Link</h4>
          <a id="link"></a>
          <h4 style="padding-top: 15px">Posted on</h4>
          <p id="time"></p>
          <h4>Average Rating</h4>
          <p id="rating1"></p>
          <h4 id="rate_head">Your Rating</h4>
          <div id = 'wrap'>
            <div id = 'stars'>
              <span id ="rating_number">Click to Rate!</span>
            </div>
          </div>
        </div>


      </div>

      <script type="text/javascript" src="/js/index.js"></script>
	
  </body>
</html> `;
return template;
};


app.get('/:notes', function (req, res) {
  var temp=req.params.notes;
  res.send(createTemplate(temp));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
