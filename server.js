var express       = require('express');
var mongoose      = require('mongoose');
var mongoose      = require('mongoose');
var app           = express();

var port = process.env.PORT || 8080;

app.use('/css', express.static('public'));

var urlSchema = new mongoose.Schema({
	original: String,
	short: String
});

var Url = mongoose.model('Url', urlSchema);

mongoose.connect(process.env.MONGO_URI, function(err){
	if(err) {
		console.log("Could not connect");
	} else {
		console.log("Database connection successful");
	}
});

function randomNumber() {
	var number = Math.floor(1000000 + Math.random() * 9999999).toString().substring(0, 4);
	return number;
};

var router = express.Router();

router.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

router.route('/new/:long_url(*)').get(function(req, res) {
	var error = { Error: "Please enter a url with the correct format. Example: http://foo.com" };

	var long_url = req.params.long_url;
	var short_url = randomNumber();

	if(long_url.indexOf("http://") && long_url.indexOf("https://" == -1)) {
		res.json(error);
	} else {
		var new_url = new Url({
			original: long_url,
			short:  short_url
		});

		new_url.save(function(err, new_url) {
			if(err) return console.log(err);
		res.json(new_url);
	});
	}
});

router.route('/urls').get(function(req,res) {
	Url.find(function(err, urls) {
		if(err) {
			return res.send(err);
		}
		res.json(urls);
	});
});

router.route('/urls/:url').get(function(req, res) {
	var getUrl = req.params.url;

	Url.findOne({ short: getUrl }, function(err, Url) {
		if(err) {
			return(err);
		}
		var originalUrl = Url.original;
		res.redirect(originalUrl);
	});
});

app.use(router);

app.listen(port, function() {
	console.log("listening at port " + port);
});
