/******************************************************************************
* selectPark() - retrieves the value of the radio button selected and sends
* that value to the server.  The server will use that value to query the
* database and return the list of attractions available at the park.  The
* attractions will then be added in a new set of radio buttons for the user
* to select from to find the current wait time for that attraction.
******************************************************************************/
function selectPark() {
  // remove attraction selections and wait time from page if they exist
  var rideNode = document.getElementById("attractionSelect");
  var timeNode = document.getElementById("waitTimeDisplay");
  while(rideNode.hasChildNodes()){
    rideNode.removeChild(rideNode.firstChild);
  }
  while(timeNode.hasChildNodes()){
    timeNode.removeChild(timeNode.firstChild);
  }

// prep to call server
  var xhttp = new XMLHttpRequest();

// build the URL to work on both the local machine and heroku
// Next 3 lines borrowed from Ralph Borcherds because they were better than what I had
  var str = window.location.pathname;
  var base_url = str.slice(0, str.lastIndexOf("/"));
  var url = "//" + window.location.host + base_url + "/selectThemepark";

// get the value of the radio button that was checked and apply to params to be passed
  var park = $('input[name=parkRadio]:checked').val();
  var params = '?park=' + park;
  console.log(url + params);

// call to server
  xhttp.open("GET", url + params, true);

// once server replies with data update the webpage with the list of attractions
  xhttp.onreadystatechange = function() {
    console.log("ready state is - " + xhttp.readyState + " and status is - " + xhttp.status);
    if(xhttp.readyState == 4 && xhttp.status == 200) {
      console.log("Doing stuff now");
      var response = JSON.parse(xhttp.responseText);
//      var input;

// create an html string to append to the appropriate div inside our web page
      var attractionList = "<h3>Select an attraction from the options below:</h3>";
      for (var i = 0; i < response.length; i++) {
        attractionList += '<div class="radio"<label><input type="radio" id="attraction" name="attractionRadio" value="' + response[i] + '" onClick="selectAttraction()">' + response[i] + '</label></div>';
      }

// append the html code to our document
      $("#attractionSelect").append(attractionList);
    }
  }

// send url
  xhttp.send();
}


/******************************************************************************
* selectAttraction() -
******************************************************************************/
function selectAttraction() {
// remove wait time from page if it exist
var timeNode = document.getElementById("waitTimeDisplay");
while(timeNode.hasChildNodes()){
  timeNode.removeChild(timeNode.firstChild);
}
// prep to call server
    var xhttp = new XMLHttpRequest();

// build the URL to work on both the local machine and heroku
    var str = window.location.pathname;
    var base_url = str.slice(0, str.lastIndexOf("/"));
    var url = "//" + window.location.host + base_url + "/selectAttraction";

// get the value of the radio button that was checked and apply to params to be passed
    var attraction = $('input[name=attractionRadio]:checked').val();
    var params = '?attraction=' + attraction;

// call to server
    xhttp.open("GET", url + params, true);

// once server replies with data update the webpage with the list of attractions
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState == 4 && xhttp.status == 200) {
        var response = xhttp.responseText;

// create html string to append to web page
        var waitTime = "<h3>Your Wait time for " + $('input[name=attractionRadio]:checked').val() + " is: " + response + " Minutes</h3>";
// append the html string
        $("#waitTimeDisplay").append(waitTime);
      }
    }
// send URL
    xhttp.send();
  }
