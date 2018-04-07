// required modules
var path = require('path');
var express = require('express');
var pg = require('pg');
var Themeparks = require('themeparks')


// begin app
var app = express();

// We are going to use sessions
//var parseurl = require('parseurl')
//var session = require('express-session')
/*
// set up sessions
app.use(session({
  secret: 'my-super-secret-secret!',
  resave: false,
  saveUninitialized: true
}))
*/

// Because we will be using post values, we need to include the body parser module
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// set the port
app.set('port', (process.env.PORT || 5000));

// We have html and js in the public directory that need to be accessed
app.use(express.static(path.join(__dirname, 'public')))

const { Pool } = require('pg');
const pool = new Pool({
  user: 'damon',
  host: 'localhost',
  database: 'themepark',
  password: 'wookie01',
  port: 5432,
});


// var url = require('url');



// connection info for local database
// ******** REMOVE BEFORE UPLOAD TO GITHUB *********
const connectionString = "postgres://damon:wookie01@localhost:5432/themepark";
var client = new pg.Client(connectionString);

// global variable to hold which themepark we want information on
// ***** MAY NOT BE NEEDED IN FINAL VERSION *****
var myThemepark = '';
var rides = [];

// set up routing
app.post('/selectPark', handleParkSelection);




/*
app.get('/MK', function(req, res){
  data = "You picked Magic Kingdom";
  rides = [];
  myThemepark = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();
  pool.query('SELECT attraction_name FROM attraction WHERE themepark_location = 1', function (err, res) {
  console.log(res.rows.attraction_name);
  console.log('data: ', rides);
  });

  var sql = "SELECT attraction_name FROM attraction WHERE themepark_location = 1";
  client.query(sql, function(err, res){
    console.log("connecting to database");
    if (err){
      console.log(err.stack);
    }

    console.log("Found result: " + JSON.stringify(result.rows));
  })

  // access wait times by Promise
  myThemepark.GetWaitTimes().then(function(rides) {
      // print each wait time
      for(var i=0, ride; ride=rides[i++];) {
          console.log(ride.name + ": " + ride.waitTime + " minutes wait");
      }
  }, console.error);
  res.send(data);
})
*/


// Start the server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/*****************************************************************************
* Supporting functions, these are candidates to be moved to a separate file.
* These are here currently for simplicity
*******************************************************************************/
function handleParkSelection(req, res){
  // sets rides to empty json
  rides = [];
  myPark = req.body.park;

  rides = getAttractionList(myPark);
  /*
  // switch statement to handle park selection
  switch(req.body.park){
    case "MagicKingdom":
      myThemepark = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();
      client.connect(function(err){
        if (err) {
          console.log("error connecting to db: " + err);
        }
        var sql = "SELECT attraction_name FROM attraction WHERE themepark_location = 1";
        client.query(sql, function(err, res){
        console.log("connecting to database");
          if (err){
            console.log(err.stack);
          }
          for (var i = 0; i < res.rows.length; i++){
            console.log(res.rows[i].attraction_name);
            rides.push(res.rows[i].attraction_name);
            console.log("rides length is: " + rides.length);
          }
        });
      });
      break;
    case "EPCOT":
      myPark = {park: req.body.park};
      break;
    case "AnimalKingdom":
      myPark = {park: req.body.park};
      break;
    case "HollywoodStudios":
      myPark = {park: req.body.park};
      break;
    }*/
//  jsonRides = JSON.stringify(rides);
  console.log("rides length to return is: " + rides.length);
  res.json(res.rows);
};

function getAttractionList(myPark){
  rideList = [];
  // switch statement to handle park selection
  switch(myPark){
    case "MagicKingdom":
      myThemepark = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();
      client.connect(function(err){
        if (err) {
          console.log("error connecting to db: " + err);
        }
        var sql = "SELECT attraction_name FROM attraction WHERE themepark_location = 1";
        client.query(sql, function(err, res){
        console.log("connecting to database");
          if (err){
            console.log(err.stack);
          }
          for (var i = 0; i < res.rows.length; i++){
            console.log(res.rows[i].attraction_name);
            rideList.push(res.rows[i].attraction_name);
            console.log("rides length is: " + rideList.length);
          }
        });
      });
      break;
    case "EPCOT":
//      myPark = {park: req.body.park};
      break;
    case "AnimalKingdom":
//      myPark = {park: req.body.park};
      break;
    case "HollywoodStudios":
//      myPark = {park: req.body.park};
      break;
    }
    console.log(rideList);
    return rideList;
}
