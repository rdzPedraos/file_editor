import axios from 'axios';

const extractDataFromTxT = file => {
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

const extractDataFromDOC = async file => {
	const formData = new FormData();
	formData.append('file', file);

	const response = await axios.post('/api/convert/word-html', formData);
	return response.data;
};

const extractDataFromXML = async file => {
	const formData = new FormData();
	formData.append('file', file);

	const response = await axios.post('/api/get/xml', formData);
	return response.data;
};

const extractDataFromCSV = async file => {
	const formData = new FormData();
	formData.append('file', file);

	const response = await axios.post('/api/get/csv', formData);
	return response.data;
};

export const downloadFile = (content, filename) => {
	const downloadUrl = window.URL.createObjectURL(new Blob([content]));
	const link = document.createElement('a');
	link.href = downloadUrl;
	link.setAttribute('download', filename);
	document.body.appendChild(link);
	link.click();
	link.remove();
};

export function getFileTypeInfo(file) {
	const type = file.name.split('.').pop().toLowerCase();

	switch (type) {
		case 'docx':
			return {
				extractData: extractDataFromDOC,
				url: '/word',
			};

		case 'txt':
			return {
				extractData: extractDataFromTxT,
				url: '/text',
			};

		case 'csv':
			return {
				extractData: extractDataFromCSV,
				url: '/csv',
			};

		case 'xml':
			return {
				extractData: extractDataFromXML,
				url: '/xml',
			};

		default:
			return null;
	}
}
