import { useContext, useMemo } from 'react';

import Upload from './pages/Upload';
import GuestLayout from './layouts/guest';
import { fileTypes } from './utils/fileTypes';
import { FileContext } from './context/FileContext';

function App() {
	const { file, data } = useContext(FileContext);

	//Must use this hook for load component dynamic.
	const Component = useMemo(() => {
		const Page = fileTypes[file?.type]?.page;
		return Page ? <Page data={data} /> : <Upload />;
	}, [file, data]);

	return (
		<GuestLayout
			onDragOver={e => e.preventDefault()}
			onDrop={e => e.preventDefault()}
		>
			{Component}
		</GuestLayout>
	);
}

export default App;
