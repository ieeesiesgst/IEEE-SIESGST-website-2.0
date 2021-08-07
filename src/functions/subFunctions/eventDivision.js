Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

function parseISOString(s) {
	var b = s.split(/\D+/);
	return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function activeUpcoming(i, content) {
	let start = new Date(content.Estart[i])
		.toDateString()
		.split(' ')
		.slice(1)
		.join(' ');

	let obj = {
		name: content.Ename[i],
		pic: content.Epic[i],
		time: content.Etime[i],
		start: start,
		small: content.Esmall[i],
		website: content.Ewebsite[i],
		reg: content.Ereg[i]
	};
	return obj;
}

module.exports = function (info, page) {
	const today = new Date();
	const content = info;
	let active = [];
	let upcoming = [];

	for (let i = 0; i <= content.Ename.length - 1; i++) {
		let parseDate = parseISOString(content.Eend[i]);
		const offlineDate = parseDate.addDays(1);

		if (offlineDate > today) {
			if (content.Estatus[i].trim().toLowerCase() == 'active') {
				const object = activeUpcoming(i, content);
				active.push(object);
			} else if (content.Estatus[i].trim().toLowerCase() == 'upcoming') {
				const object = activeUpcoming(i, content);
				upcoming.push(object);
			}
		}
	}
	if (page == 2) {
		return { activeE: active, upcomingE: upcoming };
	} else if (page == 1) {
		const allEvent = active.concat(upcoming);
		return allEvent;
	}
};
