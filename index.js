// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// endpoint - api/
app.get('/api', function (req, res) {
  let dateObject = new Date();
  res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
});

// endpoint - api/:date
app.get('/api/:date', function (req, res) {
  var dateString = req.params.date;
  let dateObject = new Date(dateString);
  let result;

  if (dateObject.toUTCString() == 'Invalid Date') {
    dateObject = new Date(+dateString);
  }

  if (dateObject.toUTCString() == 'Invalid Date') {
    result = { error: 'Invalid Date' };
  } else {
    result = { unix: dateObject.getTime(), utc: dateObject.toUTCString() };
  }

  res.json(result);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
