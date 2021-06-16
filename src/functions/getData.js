const axios = require('axios');
const qs = require('qs');

module.exports = function callAppScript(domainData) {
	return new Promise(function (resolve, reject) {
		axios
			.post(process.env.GET_SCRIPT_DATA, qs.stringify(domainData))
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	});
};
