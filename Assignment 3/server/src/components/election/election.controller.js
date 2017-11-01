'use strict';
const Election = require('./election.model').Election;

exports.getElections = (req, res) => {
	let query = '';
	if (req.query['electionId']) {
		query = {_id: req.query['electionId']}
	}

	Election.find(query).then(
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
	Election.saveElection(req.body).then((election) => {
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

exports.delete = (req, res) => {
	res.json({"data": "function not implemented yet"});

};

