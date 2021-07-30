const axios = require('axios');
const qs = require('qs');

module.exports = function callAppScript(domainData) {
	return new Promise(function (resolve, reject) {
		axios
			.post(process.env.GET_SCRIPT_DATA, qs.stringify(domainData))
			.then((response) => {
				// handle success
				return resolve(response);
			})
			.catch(function (error) {
				// handle error
				console.log(JSON.stringify(error));
				return reject('error');
			});
	});
};
