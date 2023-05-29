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
	console.log(file);
	return [];
};

const extractDataFromCSV = async file => {
	const txt = await extractDataToTxT(file);
	const lines = txt.split('\n');
	const headers = lines
		.shift()
		.split(',')
		.map(header => header.trim());

	return {
		header: headers,
		body: lines.map(line => {
			const values = line.split(',');
			const valuesLength = values.length;
			const obj = {};

			headers.forEach((header, index) => {
				if (index < valuesLength) {
					obj[header] = values[index].trim();
				}
			});

			return obj;
		}),
	};
};

const extractDataFromTXT = file => {
	console.log(file);
	return [];
};

export const fileTypes = {
	'application/msword': {
		extractData: extractDataFromDOC,
		pageUrl: '/txt',
	},
	'text/plain': {
		extractData: extractDataFromTXT,
		pageUrl: '/txt',
	},
	'application/vnd.ms-excel': {
		extractData: extractDataFromCSV,
		pageUrl: '/csv',
	},
	'text/xml': {
		extractData: extractDataFromXML,
		pageUrl: '/xlm',
	},
};
