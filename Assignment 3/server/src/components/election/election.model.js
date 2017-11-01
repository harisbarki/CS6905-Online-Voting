let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * @module  Election
 */

let Election = new Schema({
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

let election = mongoose.model('election', Election);

/** export schema */
module.exports = {
	Election: election
};
