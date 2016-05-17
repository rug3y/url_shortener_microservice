var express    = require('express');
var mongoose   = require('mongoose');
var app        = express();

var port = process.env.PORT || 8080;

var url = require('./app/models/url.js');

// data
// url { original: "original_url", short: "short_url" }

// mongoose.connect('mongodb://localhost:27017/urls'); // mongoose needs the collection name
mongoose.connect('mongodb://url_app:Toxic12@ds023932.mlab.com:23932/url_shortener', function(err){
	if(err) {
		console.log("Could not connect");
	} else {
		console.log("Database connection successful");
	}
});

// User Stories:

//1. User Story: I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

//2. User Story: If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

//3. User Story: When I visit that shortened URL, it will redirect me to my original link.

var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: "Url shortening service"});
});


// redirect example
// app.get('/red', function(req, res) {
// 	res.redirect('http://google.com');
// })

app.use(router);

app.listen(port, function() {
	console.log("listening at port " + port);
});