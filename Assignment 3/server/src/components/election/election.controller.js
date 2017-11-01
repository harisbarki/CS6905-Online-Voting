'use strict';
const Election = require('./election.model').Election;

exports.getAll = () => {
	return new Promise((resolve, reject) => {
		Election.find().then(
			data => {
				resolve(data);
			},
			error => {
				console.error('error::getAll::election', error);
				reject(error);
			}
		);
	});
};

exports.create = (req, res) => {
	Election.save(req.body).then((election) => {
		let result = {
			statusCode: 200,
			data: election
		};
		res.json(result);
	}).catch((err) => {
		console.error(err);
		let errorResponse = {
			statusCode: 500,
			message: `Oh uh, something went wrong`
		};
		res.status(errorResponse.statusCode).json(errorResponse)
	});
};

exports.update = (req, res) => {
	Election.update(req.body).then((election) => {
		let result = {
			statusCode: 200,
			data: election
		};
		res.json(result);
	}).catch((err) => {
		console.error(err);
		let errorResponse = {
			statusCode: 500,
			message: `Oh uh, something went wrong`
		};
		res.status(errorResponse.statusCode).json(errorResponse)
	});
};

