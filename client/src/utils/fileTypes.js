import EditTxt from '../pages/EditTxt';
import EditCsv from '../pages/EditCsv';
import EditXml from '../pages/EditXml';

const extractDataFromXML = file => {};

const extractDataFromDOC = file => {};

const extractDataFromCSV = file => {};

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
