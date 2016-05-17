var express       = require('express');
var mongoose      = require('mongoose');
var mongoose      = require('mongoose');
var app           = express();

var port = process.env.PORT || 8080;

var urlSchema = new mongoose.Schema({
	original: String,
	short: String
});

var Url = mongoose.model('Url', urlSchema);

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

var randomNumber = function() {
	var number = Math.floor(1000000 + Math.random() * 9999999).toString().substring(0, 4);
	return number;
}

var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: "Url shortening service"});
});

router.route('/new/:long_url').get(function(req, res) {
	var long_url = req.params.long_url;
	var short_url = randomNumber();

	var new_url = new Url({
		original: long_url,
		short:  short_url
	});

	new_url.save(function(err, new_url) {
		if(err) return console.log(err);
		res.json(new_url);
	});
});

router.route('/urls').get(function(req,res) {
	Url.find(function(err, urls) {
		if(err) {
			return res.send(err);
		}
		res.json(urls);
	});
});

// redirect example
// app.get('/red', function(req, res) {
// 	res.redirect('http://google.com');
// })

app.use(router);

app.listen(port, function() {
	console.log("listening at port " + port);
});