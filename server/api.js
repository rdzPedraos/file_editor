const express = require('express');
const app = express();

const router = express.Router();

// define the home page route
router.get('/', (req, res) => {
	res.send('Birds home page');
});

// define the about route
router.get('/file', (req, res) => {
	res.send('About birds');
});

router.post('/file/send', (req, res) => {
	console.log(req);
	res.send('file show');
});

router.get('/file/:id', (req, res) => {
	res.send('file id: ' + req.params.id);
});

module.exports = router;
