import { useContext } from 'react';

import Upload from './pages/Upload';
import { fileTypes } from './utils/fileTypes';
import { FileContext } from './context/FileContext';

function App() {
	const { file, setFile } = useContext(FileContext);
	const Component = fileTypes[file?.type]?.page ?? Upload;

	return (
		<div>
			<button onClick={() => setFile(null)}>Home</button>

			<Component />
		</div>
	);
}

export default App;
