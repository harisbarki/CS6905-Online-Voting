let config = module.exports;
let PRODUCTION = process.env.NODE_ENV === 'production';

config.express = {
	port: process.env.PORT || '3000',
	host: 'localhost'
};

config.key = {
	privateKey: 'anythingCanBeUsedHere',
	tokenExpiry: 1 * 30 * 1000 * 60 // 1 hour
};

config.mongodb = {
	host: 'mongodb://student:voting_system@ds141175.mlab.com:41175/cs6905'
};

if (PRODUCTION) {

}
