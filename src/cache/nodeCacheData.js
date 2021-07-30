const NodeCache = require('node-cache');

class Cache {
	constructor(ttlSeconds) {
		this.cache = new NodeCache({
			stdTTL: ttlSeconds,
			checkperiod: ttlSeconds * 0.2,
			useClones: false
		});
	}

	get(key, storeFunction) {
		// const mykeys = this.cache.keys();
		// console.log(mykeys);

		const value = this.cache.get(key);
		if (value) {
			return Promise.resolve(value);
		}

		return storeFunction().then((result) => {
			this.cache.set(key, result);
			return result;
		});
	}

	flush() {
		this.cache.flushAll();
	}
}

module.exports = Cache;
