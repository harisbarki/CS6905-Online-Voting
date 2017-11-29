'use strict';
const Election = require('./election.model');

exports.getElections = function (req, res) {
	var id = req.query['electionId'] ? req.query['electionId'] : '';

	var promise = id ? Election.expandVoters(Election.expandCandidates(Election.findById(id))) : Election.expandVoters(Election.expandCandidates(Election.find()));
	promise.then(
		function (data) {
			var result = {
				statusCode: 200,
				data: data
			};
			res.status(200).json(result);
		},
		function (error) {
			console.error('error::getAll::election', error);
			var errorResponse = {
				statusCode: 500,
				message: "Oh uh, something went wrong"
			};
			res.status(errorResponse.statusCode).json(errorResponse)
		}
	).catch(function (err) {
		console.error(err);
		var errorResponse = {
			statusCode: 500,
			message: "Oh uh, something went wrong"
		};
		res.status(errorResponse.statusCode).json(errorResponse)
	})
	;
}
;

exports.create = function (req, res) {
	Election.create(req.body).then(function (election) {
		var result = {
			statusCode: 200,
			data: election
		};
		res.status(200).json(result);
	}).catch(function (err) {
		console.error(err);
		var errorResponse = {
			statusCode: 500,
			message: "Oh uh, something went wrong"
		};
		res.status(errorResponse.statusCode).json(errorResponse)
	})
	;
}
;

exports.update = function (req, res) {
	console.log(req.body);
	Election.expandVoters(Election.expandCandidates(Election.update(req.body['_id'], req.body))).then(function (election) {
		var result = {
			statusCode: 200,
			data: election
		};
		res.status(200).json(result);
	}).catch(function (err) {
		console.error(err);
		var errorResponse = {
			statusCode: 500,
			message: "Oh uh, something went wrong"
		};
		res.status(errorResponse.statusCode).json(errorResponse)
	});
};

exports.delete = function (req, res) {
	res.json({"data": "function not implemented yet"});
};
