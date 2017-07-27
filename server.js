// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get('/:timestamp', function(request, response){
  var timestamp = request.params.timestamp;
  response.json(getTimestampJSON(timestamp));
})

function getTimestampJSON(timestamp) {
	var result = {
		unix: null,
		natural: null
	};
 
	var date;
	if (!isNaN(parseInt(timestamp))) {
		date = new Date(parseInt(timestamp));
	} else {
		date = new Date(timestamp);
	}
 
	if (!isNaN(date.getTime())) {
		result.unix = date.getTime();
		result.natural = getNaturalDate(date);
	}
 
	return result;
}
 
function getNaturalDate(date) {
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Obtober', 'November', 'December'];
 
	return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
