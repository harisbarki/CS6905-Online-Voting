const Mongoose = require('mongoose');
const config = require('./config/config');

var user = require('./../components/user/user.model').User;
var election = require('./../components/election/election.model').Election;

Mongoose.Promise = global.Promise;
Mongoose.connect(config.mongodb.host, {useMongoClient: true});
const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
	console.log("Connection with database succeeded.");
});

exports.db = db;
