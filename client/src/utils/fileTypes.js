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

const extractDataFromTXT = file => {
	console.log(file);
	return [];
};

export const typesMetadata = {
	word: {
		pageUrl: '/doc',
		text: 'Word',
		bgColor: '#275090',
		txtColor: '#fff',
	},
	txt: {
		pageUrl: '/txt',
		text: 'Texto',
		bgColor: '#9fd2ef',
		txtColor: '#000',
	},
	csv: {
		pageUrl: '/csv',
		text: 'CSV',
		bgColor: '#037341',
		txtColor: '#fff',
	},
	xml: {
		pageUrl: '/xml',
		text: 'XML',
		bgColor: '#f5f5f5',
		txtColor: '#ea7601',
	},
};

export function getFileTypeInfo(file) {
	switch (file.type) {
		case 'application/msword':
		case 'application/wps-office.docx':
			return {
				extractData: extractDataFromDOC,
				...typesMetadata.word,
			};
		case 'text/plain':
			return {
				extractData: extractDataFromTXT,
				...typesMetadata.txt,
			};
		case 'application/vnd.ms-excel':
			return {
				extractData: extractDataFromCSV,
				...typesMetadata.csv,
			};
		case 'text/xml':
			return {
				extractData: extractDataFromXML,
				...typesMetadata.xml,
			};
		default:
			return null;
	}
}
