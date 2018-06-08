// required modules
const { Client } = require('pg');
var path = require('path');
var express = require('express');
var pg = require('pg');
var Themeparks = require('themeparks');
var url = require('url');

// GLOBAL variables
var myThemepark = "";  // which themepark we are gathering data for
var attractions = [];  // array of attractions from selected themepark

// begin app
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Set up body-parser
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));

// set the port
app.set('port', (process.env.PORT || 5000));

// connect to database
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();

/******************************************************************************
* Routing
******************************************************************************/
// Home Page
app.get('/', function(req, res) {
  res.render('index', {
    title: 'Themepark Wait Time Home Page'
  })
});

// set the global myThemepark variable based on the park selected by the user
// and return the attractions available at that park to the webpage
app.get('/selectThemepark', function(req, res){
  var park = req.query.park;
  setThemePark(park);
  getAttractions(park)
  setTimeout(function(){
    res.json(attractions);
  }, 10);
})

// retrieve the current wait time for the attraction selected and return it to
// web page
app.get('/selectAttraction', function(req, res){
  var attraction = req.query.attraction;
  myThemepark.GetWaitTimes().then(function(rides){
    // select correct ride from API array
    for(var i=0, ride; ride=rides[i++];) {
      if(ride.name.trim() == attraction) {
        console.log(ride);
        res.json(ride.waitTime);
      }
    }
  }, console.error);
})


// Start the server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


/*****************************************************************************
* Supporting functions, these are candidates to be moved to a separate file.
* These are here currently for simplicity
*******************************************************************************/
function setThemePark(park){
  switch(park){
    case "MagicKingdom":
      myThemepark = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();
      break;
    case "Epcot":
      myThemepark = new Themeparks.Parks.WaltDisneyWorldEpcot();
      break;
    case "AnimalKingdom":
      myThemepark = new Themeparks.Parks.WaltDisneyWorldAnimalKingdom();
      break;
    case "HollywoodStudios":
      myThemepark = new Themeparks.Parks.WaltDisneyWorldHollywoodStudios();
      break;
    };
}

function getAttractions(park){
// empty the attractions array
  attractions = [];

// structure the query to retrieve park attractions from database
  var query = {
    name: 'get-park',
    text: 'SELECT attraction_name FROM attraction AS a INNER JOIN themepark AS t ON t.themepark_id = a.themepark_id WHERE t.themepark_name = $1',
    values: ['WaltDisneyWorld' + park]
  }

// query the database to retrieve list of available attractions for selected park
  client.query(query, function(err, res){
    if(err){
      console.log("database error: " + err.stack);
    }

// populate the attractions array with attraction names from database
    for(var i = 0; i < res.rows.length; i++){
      attractions.push(res.rows[i].attraction_name);
    }
  })
}
