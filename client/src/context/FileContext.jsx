import { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

import { fileTypes } from '../utils/fileTypes';
import { useNavigate } from 'react-router-dom';

export const FileContext = createContext();

function FileProvider({ children }) {
	const [file, setFile] = useState(null);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		if (file === null || file === undefined) return;
		setLoading(true);

		const fileType = fileTypes[file?.type];

		if (fileType) {
			fileType.extractData(file).then(data => {
				setData(data);
				setError(null);

				//setFile(null);
				setLoading(false);
				navigate(fileType.pageUrl);
			});
		} else {
			setError('No se reconoce el tipo de archivo.');
			setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

	return (
		<FileContext.Provider
			value={{ data, setData, file, setFile, loading, error }}
		>
			{children}
		</FileContext.Provider>
	);
}

FileProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default FileProvider;
