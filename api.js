const express = require('express');
const fs = require('fs');
const multer = require('multer');

const path = require('path');

const router = express.Router();
const upload = multer({ dest: 'temp' });
const tempFolder = path.join(__dirname, 'temp');

// Create the temp folder if it doesn't exist
if (!fs.existsSync(tempFolder)) {
	fs.mkdirSync(tempFolder);
}

function purgeTemp(path) {
	fs.unlink(path, error => {
		if (error) {
			console.error(error);
		}
	});
}

router.post('/convert/word-html', upload.single('file'), (req, res) => {
	const mammoth = require('mammoth');

	mammoth
		.convertToHtml({ path: req.file.path })
		.then(result => {
			res.json(result.value);
		})
		.catch(error => {
			console.error(error);
			res.status(500).send('An error occurred during document conversion.');
		});

	purgeTemp(req.file.path);
});

router.post('/convert/html-txt', (req, res) => {
	const { convert } = require('html-to-text');

	const htmlContent = req.body?.html || '';

	const options = {
		wordwrap: 130,
	};

	// Convert HTML to plain text using html-to-text library
	const text = convert(htmlContent, options);
	res.send(text);
});

router.post('/convert/xml-json', (req, res) => {
	const convert = require('xml-js');

	const xml = req.body?.xml || '';

	const options = {
		compact: true,
		ignoreComment: true,
		ignoreDoctype: true,
	};

	const json = convert.xml2json(xml, options);
	res.send(json);
});

router.post('/get/csv', upload.single('file'), (req, res) => {
	const csvParser = require('csv-parser');
	const results = [];

	fs.createReadStream(req.file.path)
		.pipe(csvParser())
		.on('data', data => results.push(data))
		.on('end', () => {
			purgeTemp(req.file.path);
			res.json(results);
		});
});

router.post('/get/xml', upload.single('file'), (req, res) => {
	// Leer el archivo XML como una cadena de texto
	fs.readFile(req.file.path, 'utf8', (err, xmlString) => {
		if (err) {
			console.error('Error al leer el archivo XML:', err);
			return res.status(500).json({ error: 'Error al leer el archivo XML' });
		}

		// Enviar el contenido del archivo XML como respuesta
		res.send(xmlString);
	});
});

module.exports = router;
