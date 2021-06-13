const axios = require('axios');
const qs = require('qs');

module.exports = function callAppscript(mailData) {
	return new Promise(function (resolve, reject) {
		// let sent = true;
		axios
			.post(process.env.EMAIL_VERIFICATION_SENT, qs.stringify(mailData))
			.then((response) => {
				console.log('Verification Mail Sent');
			})
			.catch((error) => {
				console.log(error);
			});
	});
};
