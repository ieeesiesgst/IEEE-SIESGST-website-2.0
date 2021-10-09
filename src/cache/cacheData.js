let defaultCache = null;
const getData = require('../functions/getData');

async function updateCache() {
	try {
		const allData = await getData({ domain: 'allDomain' });
		defaultCache = allData.data;
		console.log('Cache updated at ' + new Date());
	} catch (err) {
		console.log(err);
	}
}

updateCache();

setInterval(updateCache, 3 * 60 * 60 * 1000);

module.exports = (domain) => {
	return defaultCache[domain];
};
