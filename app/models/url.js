var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var urlSchema = new Schema({

	original: String,
	short: String

});

module.exports = mongoose.model('Url', urlSchema);