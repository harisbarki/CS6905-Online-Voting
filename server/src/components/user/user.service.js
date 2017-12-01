'use strict';
const Config = require('../../shared/config/config');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const privateKey = Config.key.privateKey;

exports.decrypt = function (password) {
	return decrypt(password);
};

exports.encrypt = function (password) {
	return encrypt(password);
};

exports.sentMailVerificationLink = function (user, token) {
	var textLink = "http://" + Config.express.host + ":" + Config.express.port + "/" + Config.email.verifyEmailUrl + "/" + token;
	var sender = "Barki Team<" + Config.email.user + ">";
	var mailBody = "<p>Thanks for Registering</p><p>Please verify your email by clicking on the verification link below.<br/><a href=" + textLink.toString() + ">Verification Link</a></p>";
	// return sendMail(sender, user.email, `Account Verification`, mailBody);
};

exports.sentMailForgotPassword = function (user, token) {
	var textLink = "http://" + Config.express.host + ":" + Config.express.port + "/" + Config.email.resetEmailUrl + "/" + token;
	var sender = "Barki Team<" + Config.email.user + ">";
	var mailBody = "<p>Please reset your password by clicking on the link below.<br/><a href=" + textLink.toString() + "}>Reset Password Link</a></p>";
	// return sendMail(sender, user.email, `Account New password`, mailBody);
};

function decrypt(password) {
	var decipher = crypto.createDecipher(algorithm, privateKey);
	var dec = decipher.update(password, 'hex', 'utf8');
	dec += decipher.final('utf8');
	return dec;
}

function encrypt(password) {
	var cipher = crypto.createCipher(algorithm, privateKey);
	var crypted = cipher.update(password.toString(), 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}

