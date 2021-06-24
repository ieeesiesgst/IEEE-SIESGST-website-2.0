const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('partials/events', { title: 'EVENTS | IEEE SIESGST' });
});

module.exports = router;
