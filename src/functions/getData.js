const axios = require('axios');
const qs = require('qs');

module.exports = function callAppScript(domainData) {
	console.log(domainData);
	return new Promise(function (resolve, reject) {
		axios
			.post(process.env.GET_SCRIPT_DATA, qs.stringify(domainData))
			.then((response) => {
				// handle success
				console.log('working', response.data);
				resolve(1);
			})
			.catch(function (error) {
				// handle error
				console.log('hereeeeee', error);
				resolve(2);
			});
	});
};
