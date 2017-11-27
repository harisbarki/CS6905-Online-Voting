var fs = require('fs');
const path = require("path");

var usersRoutes = require('./user/user.routes');
var electionRoutes = require('./election/election.routes');
var contactUsRoutes = require('./contact-us/contact-us.routes');

var clientPath = '../../client_dist/index.html';

module.exports = function(app) {

	app.use('/api/user', usersRoutes);
	app.use('/api/election', electionRoutes);
	app.use('/api/contact-us', contactUsRoutes);

	app.get('*', function (req, res) {
		if (fs.existsSync(clientPath)) {
			res.sendFile(path.join(__dirname + clientPath));
		} else {
			console.log('Either your frontend was not built properly, and is missing files or you are running hmr(hot module replacement), in latter case please go to 127.0.0.1:4200 to access the website!');
			res.send("<p>You are running hmr please go to <a href='http://127.0.0.1:4200'>127.0.0.1:4200</a> to access the website!"
				+ "<br>Also you need to start the browser without security for cross scripting if you want to make api calls to the backend"
				+ "<br>Example command:"
				+ "<br><code>\"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe\" --user-data-dir=\"C:/Chrome dev session2\" --disable-web-security</code></p>");
		}
	});
};
