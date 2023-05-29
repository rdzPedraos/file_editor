import EditTxt from '../pages/EditTxt';
import EditCsv from '../pages/EditCsv';
import EditXml from '../pages/EditXml';

const extractDataToTxT = file => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = e => {
			const content = e.target.result;
			resolve(content);
		};

		reader.onerror = e => {
			reject(new Error('Error al leer el archivo.'));
		};

		reader.readAsText(file);
	});
};

const extractDataFromXML = file => {};

const extractDataFromDOC = file => {};

const extractDataFromCSV = async file => {
	const txt = await extractDataToTxT(file);
	const lines = txt.split('\n');
	const headers = lines
		.shift()
		.split(',')
		.map(header => header.trim());

	return lines.map(line => {
		const values = line.split(',');
		const valuesLength = values.length;
		const obj = {};

		headers.forEach((header, index) => {
			if (index < valuesLength) {
				obj[header] = values[index].trim();
			}
		});

		return obj;
	});
};

const extractDataFromTXT = file => {};

export const fileTypes = {
	'application/msword': {
		extractData: extractDataFromDOC,
		page: EditTxt,
	},
	'text/plain': {
		extractData: extractDataFromTXT,
		page: EditTxt,
	},
	'application/vnd.ms-excel': {
		extractData: extractDataFromCSV,
		page: EditCsv,
	},
	'text/xml': {
		extractData: extractDataFromXML,
		page: EditXml,
	},
};
