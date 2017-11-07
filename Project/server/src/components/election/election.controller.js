'use strict';
const Election = require('./election.model');

exports.getElections = (req, res) => {
	let id = req.query['electionId'] ? req.query['electionId'] : '';

	let promise = id ? Election.expandCandidates(Election.findById(id)) : Election.expandCandidates(Election.find());
	promise.then(
		(data) => {
			let result = {
				statusCode: 200,
				data: data
			};
			res.status(200).json(result);
		},
		(error) => {
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
	Election.create(req.body).then((election) => {
		let result = {
			statusCode: 200,
			data: election
		};
		res.status(200).json(result);
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
	console.log(req.body);
	Election.expandCandidates(Election.update(req.body['_id'], req.body)).then((election) => {
		let result = {
			statusCode: 200,
			data: election
		};
		res.status(200).json(result);
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
