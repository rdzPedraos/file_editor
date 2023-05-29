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
	return txt
		.split('\n')
		.map(line => line.split(',').map(value => value.trim()));
};

const extractDataFromTXT = file => {
	console.log(file);
	return [];
};

export const fileTypes = {
	'application/msword': {
		extractData: extractDataFromDOC,
		pageUrl: '/doc',
		text: 'Word',
		bgColor: '#275090',
		txtColor: '#fff',
	},
	'text/plain': {
		extractData: extractDataFromTXT,
		pageUrl: '/txt',
		text: 'Texto',
		bgColor: '#9fd2ef',
		txtColor: '#000',
	},
	'application/vnd.ms-excel': {
		extractData: extractDataFromCSV,
		pageUrl: '/csv',
		text: 'CSV',
		bgColor: '#037341',
		txtColor: '#fff',
	},
	'text/xml': {
		extractData: extractDataFromXML,
		pageUrl: '/xlm',
		text: 'XML',
		bgColor: '#ea7301',
		txtColor: '#fff',
	},
};
