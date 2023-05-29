const express = require('express');
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

const tempFolder = path.join(__dirname, 'temp');

// Create the temp folder if it doesn't exist
if (!fs.existsSync(tempFolder)) {
	fs.mkdirSync(tempFolder);
}

app.use(express.raw({ type: 'application/octet-stream' }));

app.post('/convert/word', (req, res) => {
	const fileData = req.body;
	const tempFilePath = path.join(tempFolder, `temp_${Date.now()}.docx`);

	// Write the file data to the temp file
	fs.writeFile(tempFilePath, fileData, err => {
		if (err) {
			console.error(err);
			res.status(500).send('An error occurred while saving the file.');
			return;
		}

		// Use Mammoth to convert the document
		mammoth
			.convertToHtml({ path: tempFilePath })
			.then(result => {
				const response = { html: result.value };

				// Delete the temp file
				fs.unlink(tempFilePath, err => {
					if (err) {
						console.error(err);
					}
				});

				res.json(response);
			})
			.catch(error => {
				console.error(error);
				res.status(500).send('An error occurred during document conversion.');
			});
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
