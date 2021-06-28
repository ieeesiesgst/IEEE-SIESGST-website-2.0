const express = require('express');

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
	Ename = content.Ename[i];
	pic = content.Epic[i];
	time = content.Etime[i];
	start = new Date(content.Estart[i])
		.toDateString()
		.split(' ')
		.slice(1)
		.join(' ');
	small = content.Esmall[i];
	web = content.Eweb[i];
	register = content.Ereg[i];

	let obj = {
		name: Ename,
		pic: pic,
		time: time,
		start: start,
		small: small,
		website: web,
		reg: register
	};
	return obj;
}

// module.exports = function (info) {
// 	const today = new Date();
// 	const content = info.data;
// 	let nameA = [];
// 	let picA = [];
// 	let timeA = [];
// 	let startA = [];
// 	let smallA = [];
// 	let active = {};

// 	for (let i = 0; i <= content.Ename.length - 1; i++) {
// 		let endDate = content.Eend[i] + 1;
// 		let parseDate = parseISOString(content.Eend[i]);
// 		const rangeDate = parseDate.addDays(-7);

// 		const upcoming = {};

// 		if (rangeDate <= today && today <= parseDate) {
// 			console.log('active');
// 			nameA.push(content.Ename[i]);
// 			picA.push(content.Epic[i]);
// 			timeA.push(content.Etime[i]);
// 			startA.push(content.Estart[i]);
// 			smallA.push(content.Esmall[i]);

// 			active = {
// 				activeEvent: nameA,
// 				activePic: picA,
// 				activeTime: timeA,
// 				activeStart: startA,
// 				activeSmall: smallA,
// 			};
// 		} else if (rangeDate >= today) {
// 			console.log('upcoming');
// 		} else {
// 			console.log('offline');
// 		}
// 	}
// 	console.log(active);
// };

module.exports = function (info) {
	const today = new Date();
	const content = info.data;
	let active = [];
	let upcoming = [];
	// let name, pic, time, start, small;

	for (let i = 0; i <= content.Ename.length - 1; i++) {
		let parseDate = parseISOString(content.Eend[i]);
		const rangeDate = parseDate.addDays(-7);

		if (rangeDate <= today && today <= parseDate) {
			// console.log('active');
			const object = activeUpcoming(i, content);
			active.push(object);
		} else if (rangeDate >= today) {
			// console.log('upcoming');
			const object = activeUpcoming(i, content);
			upcoming.push(object);
		}
	}
	console.log(active[0]);
	return (divided = { activeE: active, upcomingE: upcoming });
};
