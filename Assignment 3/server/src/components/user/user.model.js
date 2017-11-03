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
			type: Date
		},
		createdAt: {
			type: Date
		},
		modifiedAt: {
			type: Date
		}
	})
;

User.plugin(uniqueValidator);
let userModel = mongoose.model('user', User);

/**
 * Creates the user in the database
 * @api
 * @param {Object} user
 * @returns {Promise<User>} user
 */
exports.create = (user) => {
	return userModel.create(user);
};

/**
 * Updates the user in the database
 * @api
 * @param {Object} user
 * @returns {Promise<User, Error>} user
 */
exports.update = (user) => {
	return userModel.save(user);
};

/**
 * Find the user with given id
 * @api
 * @param {string} id
 * @returns {Promise<User, Error>} user
 */
exports.findById = (id) => {
	return userModel.findOne({
		_id: id
	});
};

/**
 * Find the user with given email
 * @api
 * @param {string} email
 * @returns {Promise<User, Error>} user
 */
exports.findByEmail = (email) => {
	return userModel.findOne({
		email: email
	});
};

/**
 * Find the user with given id and email
 * @api
 * @param {string} id
 * @param {string} email
 * @returns {Promise<User, Error>} user
 */
exports.findUserByIdAndEmail = (id, email) => {
	return userModel.findOne({
		_id: id,
		email: email
	});
};
