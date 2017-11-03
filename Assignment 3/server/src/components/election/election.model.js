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
	totalVotesCasted: {
		type: Number,
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
 * @param {Election}election
 * @return {Query} election
 */
exports.create = (election) => {
	return electionModel.create(election);
};

/**
 * Updates the election in the database
 * @param {string} id
 * @param {Election} election
 * @return {Query} election
 */
exports.update = (id, election) => {
	return electionModel.findOneAndUpdate({
		_id: id
	}, election);
};

/**
 * Finds the election given the id
 * @param {string} id
 * @return {Query} election
 */
exports.findById = (id) => {
	return electionModel.findOne({
		_id: id
	}).populate('candidates.candidateId');
};

/**
 * Finds all the elections
 * @return {Query} election
 */
exports.find = () => {
	return electionModel.find().populate('candidates.candidateId');
};

/**
 * Finds all the elections of the given user
 * @param {string} userId
 * @return {Query} election
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
	}).populate('candidates.candidateId');
};
