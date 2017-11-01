'use strict';
const Election = require('./election.model').Election;

exports.getAll = (req, res) => {
		Election.find().then(
			data => {
				let result = {
					statusCode: 200,
					data: data
				};
				res.json(result);
			},
			error => {
				console.error('error::getAll::election', error);
				let errorResponse = {
					statusCode: 500,
					message: `Oh uh, something went wrong`
				};
				res.status(errorResponse.statusCode).json(errorResponse)
			}
		).catch((err) => {
			console.error(err);
			let errorResponse = {
				statusCode: 500,
				message: `Oh uh, something went wrong`
			};
			res.status(errorResponse.statusCode).json(errorResponse)
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

