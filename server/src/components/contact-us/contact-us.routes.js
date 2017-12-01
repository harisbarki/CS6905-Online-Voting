const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
	var subject = "MEAN_SEED:ContactUs:${req.body.name}";
	var mailBody = "<strong>Name: </strong>" + req.body.name +
				"<br><strong>Email: </strong>" + req.body.email +
				"<br><strong>Message: </strong>" + req.body.message;

	// Send the email or store it in database
	console.log('subject', subject);
	console.log('mailBody', mailBody);
});

module.exports = router;
