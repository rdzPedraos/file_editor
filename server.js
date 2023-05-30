const express = require('express');
const bodyParser = require('body-parser');

const api = require('./api');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.use(express.static('./client/dist'));
app.use('/api', api);

app.use(express.static('../client/public'));

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
