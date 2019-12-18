// Require our dependencies
var express = require('express'),
  exphbs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  twitter = require('twitter'),

  routes = require('./routes'),
  config = require('./config'),
  streamHandler = require('./utils/streamHandler');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 8080;

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

// Connect to our mongo database
mongoose.connect('mongodb://localhost/react-tweets');

// Create a new ntwitter instance
var twit = new twitter(config.twitter);

// Index Route
app.get('/', routes.index);

// Page Route
app.get('/page/:page/:skip', routes.page);

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

// Fire this bitch up (start our server)
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// Initialize socket.io
var io = require('socket.io').listen(server);




// Set a stream listener for tweets matching tracking keywords
//twit.stream('statuses/filter',{ track: ['i66', 'i95', 'i270', 'i395', 'i495', 'i-66', 'i-95', 'i-270', 'i-395', 'i-495', 'interstate 66', 'interstate 95', 'interstate 270', 'interstate 395', 'interstate 495', 'Maryland Rt. 4', 'Maryland Route 4', 'Maryland highway 4', 'Maryland hwy 4', 'Maryland Rt. 7', 'Maryland Route 7', 'Maryland highway 7', 'Maryland hwy 7', 'Maryland Rt. 28', 'Maryland Route 28', 'Maryland highway 28', 'Maryland hwy 28', 'Maryland Rt. 29', 'Maryland Route 29', 'Maryland highway 29', 'Maryland hwy 29', 'Maryland Rt. 32', 'Maryland Route 32', 'Maryland highway 32', 'Maryland hwy 32', 'Maryland Rt. 117', 'Maryland Route 117', 'Maryland highway 117', 'Maryland hwy 117', 'Maryland Rt. 119', 'Maryland Route 119', 'Maryland highway 119', 'Maryland hwy 119', 'Maryland Rt. 123', 'Maryland Route 123', 'Maryland highway 123', 'Maryland hwy 123', 'Maryland Rt. 124', 'Maryland Route 124', 'Maryland highway 124', 'Maryland hwy 124', 'Maryland Rt. 190', 'Maryland Route 190', 'Maryland highway 190', 'Maryland hwy 190', 'Maryland Rt. 193', 'Maryland Route 193', 'Maryland highway 193', 'Maryland hwy 193', 'Maryland Rt. 200', 'Maryland Route 200', 'Maryland highway 200', 'Maryland hwy 200', 'Maryland Rt. 214', 'Maryland Route 214', 'Maryland highway 214', 'Maryland hwy 214', 'Maryland Rt. 236', 'Maryland Route 236', 'Maryland highway 236', 'Maryland hwy 236', 'Maryland Rt. 309', 'Maryland Route 309', 'Maryland highway 309', 'Maryland hwy 309', 'Maryland Rt. 337', 'Maryland Route 337', 'Maryland highway 337', 'Maryland hwy 337', 'Maryland Rt. 355', 'Maryland Route 355', 'Maryland highway 355', 'Maryland hwy 355', 'Maryland Rt. 613', 'Maryland Route 613', 'Maryland highway 613', 'Maryland hwy 613', 'Maryland Rt. 659', 'Maryland Route 659', 'Maryland highway 659', 'Maryland hwy 659', 'Maryland Rt. 684', 'Maryland Route 684', 'Maryland highway 684', 'Maryland hwy 684', 'Maryland Rt. 650', 'Maryland Route 650', 'Maryland highway 650', 'Maryland hwy 650', 'Virginia Rt. 4', 'Virginia Route 4', 'Virginia highway 4', 'Virginia hwy 4', 'Virginia Rt. 7', 'Virginia Route 7', 'Virginia highway 7', 'Virginia hwy 7', 'Virginia Rt. 28', 'Virginia Route 28', 'Virginia highway 28', 'Virginia hwy 28', 'Virginia Rt. 29', 'Virginia Route 29', 'Virginia highway 29', 'Virginia hwy 29', 'Virginia Rt. 32', 'Virginia Route 32', 'Virginia highway 32', 'Virginia hwy 32', 'Virginia Rt. 117', 'Virginia Route 117', 'Virginia highway 117', 'Virginia hwy 117', 'Virginia Rt. 119', 'Virginia Route 119', 'Virginia highway 119', 'Virginia hwy 119', 'Virginia Rt. 123', 'Virginia Route 123', 'Virginia highway 123', 'Virginia hwy 123', 'Virginia Rt. 124', 'Virginia Route 124', 'Virginia highway 124', 'Virginia hwy 124', 'Virginia Rt. 190', 'Virginia Route 190', 'Virginia highway 190', 'Virginia hwy 190', 'Virginia Rt. 193', 'Virginia Route 193', 'Virginia highway 193', 'Virginia hwy 193', 'Virginia Rt. 200', 'Virginia Route 200', 'Virginia highway 200', 'Virginia hwy 200', 'Virginia Rt. 214', 'Virginia Route 214', 'Virginia highway 214', 'Virginia hwy 214', 'Virginia Rt. 236', 'Virginia Route 236', 'Virginia highway 236', 'Virginia hwy 236', 'Virginia Rt. 309', 'Virginia Route 309', 'Virginia highway 309', 'Virginia hwy 309', 'Virginia Rt. 337', 'Virginia Route 337', 'Virginia highway 337', 'Virginia hwy 337', 'Virginia Rt. 355', 'Virginia Route 355', 'Virginia highway 355', 'Virginia hwy 355', 'Virginia Rt. 613', 'Virginia Route 613', 'Virginia highway 613', 'Virginia hwy 613', 'Virginia Rt. 659', 'Virginia Route 659', 'Virginia highway 659', 'Virginia hwy 659', 'Virginia Rt. 684', 'Virginia Route 684', 'Virginia highway 684', 'Virginia hwy 684', 'Virginia Rt. 650', 'Virginia Route 650', 'Virginia highway 650', 'Virginia hwy 650', 'U.S Rt. 1', 'U.S Route 1', 'U.S highway 1', 'U.S hwy 1', 'U.S Rt. 29', 'U.S Route 29', 'U.S highway 29', 'U.S hwy 29', 'U.S Rt. 50', 'U.S Route 50', 'U.S highway 50', 'U.S hwy 50', 'US Rt. 1', 'US Route 1', 'US highway 1', 'US hwy 1', 'US Rt. 29', 'US Route 29', 'US highway 29', 'US hwy 29', 'US Rt. 50', 'US Route 50', 'US highway 50', 'US hwy 50']}, function(stream){
//  streamHandler(stream,io);
//});

twit.stream('statuses/filter',{ track: "George Washington Memorial Parkway,SuitLand parkway,i66,i95,i270,i395,i495,i-66,i-95,i-270,i-395,i-495,interstate 66,interstate 95,interstate 270,interstate 395,interstate 495,Maryland Rt. 4,Maryland Route 4,Maryland highway 4,Maryland hwy 4,Maryland Rt. 7,Maryland Route 7,Maryland highway 7,Maryland hwy 7,Maryland Rt. 28,Maryland Route 28,Maryland highway 28,Maryland hwy 28,Maryland Rt. 29,Maryland Route 29,Maryland highway 29,Maryland hwy 29,Maryland Rt. 32,Maryland Route 32,Maryland highway 32,Maryland hwy 32,Maryland Rt. 117,Maryland Route 117,Maryland highway 117,Maryland hwy 117,Maryland Rt. 119,Maryland Route 119,Maryland highway 119,Maryland hwy 119,Maryland Rt. 123,Maryland Route 123,Maryland highway 123,Maryland hwy 123,Maryland Rt. 124,Maryland Route 124,Maryland highway 124,Maryland hwy 124,Maryland Rt. 190,Maryland Route 190,Maryland highway 190,Maryland hwy 190,Maryland Rt. 193,Maryland Route 193,Maryland highway 193,Maryland hwy 193,Maryland Rt. 200,Maryland Route 200,Maryland highway 200,Maryland hwy 200,Maryland Rt. 214,Maryland Route 214,Maryland highway 214,Maryland hwy 214,Maryland Rt. 236,Maryland Route 236,Maryland highway 236,Maryland hwy 236,Maryland Rt. 309,Maryland Route 309,Maryland highway 309,Maryland hwy 309,Maryland Rt. 337,Maryland Route 337,Maryland highway 337,Maryland hwy 337,Maryland Rt. 355,Maryland Route 355,Maryland highway 355,Maryland hwy 355,Maryland Rt. 613,Maryland Route 613,Maryland highway 613,Maryland hwy 613,Maryland Rt. 659,Maryland Route 659,Maryland highway 659,Maryland hwy 659,Maryland Rt. 684,Maryland Route 684,Maryland highway 684,Maryland hwy 684,Maryland Rt. 650,Maryland Route 650,Maryland highway 650,Maryland hwy 650,Virginia Rt. 4,Virginia Route 4,Virginia highway 4,Virginia hwy 4,Virginia Rt. 7,Virginia Route 7,Virginia highway 7,Virginia hwy 7,Virginia Rt. 28,Virginia Route 28,Virginia highway 28,Virginia hwy 28,Virginia Rt. 29,Virginia Route 29,Virginia highway 29,Virginia hwy 29,Virginia Rt. 32,Virginia Route 32,Virginia highway 32,Virginia hwy 32,Virginia Rt. 117,Virginia Route 117,Virginia highway 117,Virginia hwy 117,Virginia Rt. 119,Virginia Route 119,Virginia highway 119,Virginia hwy 119,Virginia Rt. 123,Virginia Route 123,Virginia highway 123,Virginia hwy 123,Virginia Rt. 124,Virginia Route 124,Virginia highway 124,Virginia hwy 124,Virginia Rt. 190,Virginia Route 190,Virginia highway 190,Virginia hwy 190,Virginia Rt. 193,Virginia Route 193,Virginia highway 193,Virginia hwy 193,Virginia Rt. 200,Virginia Route 200,Virginia highway 200,Virginia hwy 200,Virginia Rt. 214,Virginia Route 214,Virginia highway 214,Virginia hwy 214,Virginia Rt. 236,Virginia Route 236,Virginia highway 236,Virginia hwy 236,Virginia Rt. 309,Virginia Route 309,Virginia highway 309,Virginia hwy 309,Virginia Rt. 337,Virginia Route 337,Virginia highway 337,Virginia hwy 337,Virginia Rt. 355,Virginia Route 355,Virginia highway 355,Virginia hwy 355,Virginia Rt. 613,Virginia Route 613,Virginia highway 613,Virginia hwy 613,Virginia Rt. 659,Virginia Route 659,Virginia highway 659,Virginia hwy 659,Virginia Rt. 684,Virginia Route 684,Virginia highway 684,Virginia hwy 684,Virginia Rt. 650,Virginia Route 650,Virginia highway 650,Virginia hwy 650,U.S Rt. 1,U.S Route 1,U.S highway 1,U.S hwy 1,U.S Rt. 29,U.S Route 29,U.S highway 29,U.S hwy 29,U.S Rt. 50,U.S Route 50,U.S highway 50,U.S hwy 50,US Rt. 1,US Route 1,US highway 1,US hwy 1,US Rt. 29,US Route 29,US highway 29,US hwy 29,US Rt. 50,US Route 50,US highway 50,US hwy 50"}, function(stream){
streamHandler(stream,io);
});

