import PropTypes from 'prop-types';
import { useState, useEffect, createContext } from 'react';
import { fileTypes } from '../utils/fileTypes';

export const FileContext = createContext();

function FileProvider({ children }) {
	const [file, setFile] = useState(null);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (file === null || file === undefined) return;
		setLoading(true);

		const fileType = fileTypes[file?.type];

		if (fileType) {
			const data = fileType.extractData(file);
			setData(data);
			setError(null);
		} else {
			setError('No se reconoce el tipo de archivo.');
		}
		setLoading(false);
	}, [file]);

	return (
		<FileContext.Provider value={{ data, file, setFile, loading, error }}>
			{children}
		</FileContext.Provider>
	);
}

FileProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default FileProvider;
