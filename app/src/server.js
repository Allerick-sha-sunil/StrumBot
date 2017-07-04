var express = require('express');
var app = express();
var root = process.cwd();

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

app.get('/notes', function (req, res) {
    res.sendFile('html/notes.html',{root});
});

app.get('/search', function (req, res) {
    res.sendFile('html/notes.html',{root});
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
