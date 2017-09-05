// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/:when", function (request, response) {
  if (request.params.when) {
    var when = request.params.when;
    var date = new Date(when);
    if (!date.getTime()) {
      date = new Date(when * 1000);
    }
    var result = {
      unix: null,
      natural: null
    }
    if (date.getTime()) {
      result = {
        unix: date.getTime()/1000,
        natural: date.toLocaleString('en-us', {month: 'long', day: 'numeric', year: 'numeric'})
      }
    }
    response.writeHead(200);
    response.end(JSON.stringify(result));
  } else {
    response.sendFile(__dirname + '/views/index.html');
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
