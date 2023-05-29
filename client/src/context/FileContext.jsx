import { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

import { getFileTypeInfo } from '../utils/fileTypes';
import { useNavigate, useLocation } from 'react-router-dom';

export const FileContext = createContext();

function FileProvider({ children }) {
	const [file, setFile] = useState(null);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (file === null || file === undefined) return;
		setLoading(true);

		const fileTypeInfo = getFileTypeInfo(file);

		if (fileTypeInfo) {
			fileTypeInfo.extractData(file).then(data => {
				setData(data);
				setError(null);

				//setFile(null);
				setLoading(false);
				navigate(fileTypeInfo.url);
			});
		} else {
			setError('No se reconoce el tipo de archivo.');
			setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

	useEffect(() => {
		if (location.pathname !== '/' && file === null) {
			navigate('/');
		}
	}, [location.pathname, file]);

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
