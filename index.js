var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var path = require('path');
var themeparks = require('themeparks');
var url = require('url');

var app = express();

var port = (process.env.PORT || 5000);

app.use(express.static(__dirname + 'public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index.ejs');
})











app.listen(port, function(){
  console.log('Running on port', port);
});
