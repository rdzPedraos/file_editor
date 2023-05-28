import { useContext } from 'react';

import Upload from './pages/Upload';
import GuestLayout from './layouts/guest';
import { fileTypes } from './utils/fileTypes';
import { FileContext } from './context/FileContext';

function App() {
	const { file } = useContext(FileContext);
	const Component = fileTypes[file?.type]?.page ?? Upload;

	return (
		<GuestLayout>
			<Component />
		</GuestLayout>
	);
}

export default App;
