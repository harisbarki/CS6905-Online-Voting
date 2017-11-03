let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let uniqueValidator = require('mongoose-unique-validator');

/**
 * @module  User
 * @description contain the details of Attribute
 */
let User = new Schema({
		email: {
			type: String,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		isVerified: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			default: ''
		},
		phone: {
			type: String,
			default: ''
		},
		address: {
			type: String,
			default: ''
		},
		role: {
			type: String,
			default: 'voter'
		},
		isEnabled: {
			type: Boolean,
			default: true
		},
		incorrectLoginTries: {
			type: Number,
			default: 0
		},
		securityQuestions: [
			{
				_id: false,
				question: {
					type: String
				},
				answer: {
					type: String
				}
			}
		],
		lastActiveAt: {
			type: Date,
			default: Date.now
		},
		createdAt: {
			type: Date,
			default: Date.now
		},
		modifiedAt: {
			type: Date,
			default: Date.now
		}
	})
;

User.plugin(uniqueValidator);

User.statics = {
	saveUser: function (requestData) {
		return this.create(requestData);
	},
	findUserUpdate: function (query, user) {
		return this.findOneAndUpdate(query, user);
	},
	updateUser: function (user) {
		return user.save();
	},

	findUser: function (query) {
		return this.findOne(query);
	},

	findUserByIdAndEmail: function (id, email) {
		return this.findOne({email: email, _id: id});
	}
};

let user = mongoose.model('user', User);

/** export schema */
module.exports = {
	User: user
};
