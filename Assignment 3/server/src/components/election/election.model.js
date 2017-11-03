'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * @module  Election
 */
let ElectionSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	winningStrategy: {
		type: String,
		required: true
	},
	dateFrom: {
		type: Date,
	},
	dateTo: {
		type: Date,
	},
	isDistrictElections: {
		type: Boolean,
	},
	numberOfDistricts: {
		type: Number,
	},
	candidatesStrategy: {
		type: String,
	},
	usersStrategy: {
		type: String,
	},
	userObjectConditions: {
		type: String,
	},
	candidates: [
		{
			_id: false,
			candidateId: {
				type: Schema.ObjectId,
				ref: 'user'
			},
			numOfVotes: {
				type: Number
			},
			isApproved: {
				type: String
			}
		}
	],
	voters: [
		{
			_id: false,
			voterId: {
				type: Schema.ObjectId,
				ref: 'user'
			},
			hasVoted: {
				type: Boolean
			},
			votedFor: {
				type: Schema.ObjectId,
				ref: 'user'
			}
		}
	]
});

let electionModel = mongoose.model('election', ElectionSchema);

/**
 * Creates the election in the database
 * @api
 * @param {Object<Election>}election
 * @returns {Query<Election, Error>} election
 */
exports.create = (election) => {
	return electionModel.create(election);
};

/**
 * Updates the election in the database
 * @api
 * @param {string} id
 * @param {Object<Election>} election
 * @returns {Query<Election, Error>} election
 */
exports.update = (id, election) => {
	return electionModel.findOneAndUpdate({
		_id: id
	}, election, {new: true});
};

/**
 * Finds the election given the id
 * @api
 * @param {string} id
 * @returns {Query<Election, Error>} election
 */
exports.findById = (id) => {
	return electionModel.findOne({
		_id: id
	});
};

/**
 * Finds all the elections
 * @api
 * @returns {Query<Election[], Error>} election
 */
exports.find = () => {
	return electionModel.find();
};

/**
 * Finds all the elections of the given user
 * @api
 * @param {string} userId
 * @returns {Query<Election[], Error>} election
 */
exports.findUserElections = (userId) => {
	return electionModel.find({
		$or: {
			voters: {
				$elemMatch: {voterId: userId}
			},
			candidates: {
				$elemMatch: {candidateId: userId}
			}
		}
	});
};

/**
 * Expand the candidates
 * @example findById(id).expandCandidates()
 * @api
 * @param {Query} query
 * @returns {Query} election
 */
exports.expandCandidates = (query) => {
	return query.populate('candidates.candidateId');
};

