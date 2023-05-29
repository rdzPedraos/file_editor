const extractDataToTxT = file => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = e => {
			const content = e.target.result;
			resolve(content);
		};

		reader.onerror = () => {
			reject(new Error('Error al leer el archivo.'));
		};

		reader.readAsText(file);
	});
};

const extractDataFromXML = file => {
	console.log(file);
	return [];
};

const extractDataFromDOC = file => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = function (e) {
			const fileData = e.target.result;

			// Send the file data to the server
			fetch('api/convert/word', {
				method: 'POST',
				body: fileData,
				headers: {
					'Content-Type': 'application/octet-stream',
				},
			})
				.then(response => response.json())
				.then(data => {
					const html = data.html;
					resolve(html);
				})
				.catch(error => {
					console.error(error);
					reject(new Error('Error al leer el archivo.'));
				});
		};

		reader.readAsArrayBuffer(file);
	});
};

const extractDataFromCSV = async file => {
	const txt = await extractDataToTxT(file);
	return txt
		.split('\n')
		.map(line => line.split(',').map(value => value.trim()));
};

export function getFileTypeInfo(file) {
	switch (file.type) {
		case 'application/msword':
		case 'application/wps-office.docx':
			return {
				extractData: extractDataFromDOC,
				url: '/word',
			};
		case 'text/plain':
			return {
				extractData: extractDataToTxT,
				url: '/text',
			};
		case 'application/vnd.ms-excel':
			return {
				extractData: extractDataFromCSV,
				url: '/csv',
			};
		case 'text/xml':
			return {
				extractData: extractDataFromXML,
				url: '/xml',
			};
		default:
			return null;
	}
}
