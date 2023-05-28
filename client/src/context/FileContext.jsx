import PropTypes from 'prop-types';
import { useState, useEffect, createContext } from 'react';
import { fileTypes } from '../utils/fileTypes';

export const FileContext = createContext();

function FileProvider({ children }) {
	const [file, setFile] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		if (file === null || file === undefined) return;

		const data = fileTypes[file.type]?.extractData(file);
		setData(data);
	}, [file]);

	return (
		<FileContext.Provider value={{ data, file, setFile }}>
			{children}
		</FileContext.Provider>
	);
}

FileProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default FileProvider;
