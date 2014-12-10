var mongoose = require('mongoose');
	
	mongoose.connect('mongodb://admin:admin@ds053370.mongolab.com:53370/flights');
	module.exports = mongoose.connection;