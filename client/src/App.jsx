import { Route, Routes } from 'react-router-dom';

import Upload from './pages/Upload';
import EditCsv from './pages/EditCsv';
import EditTxt from './pages/EditTxt';
import EditXml from './pages/EditXml';
import GuestLayout from './layouts/Guest';

function App() {
	return (
		<GuestLayout
			onDragOver={e => e.preventDefault()}
			onDrop={e => e.preventDefault()}
		>
			<Routes>
				<Route path='/' exact element={<Upload />} />
				<Route path='/csv' element={<EditCsv />} />
				<Route path='/txt' element={<EditTxt />} />
				<Route path='/doc' element={<EditTxt />} />
				<Route path='/xlm' element={<EditXml />} />
			</Routes>
		</GuestLayout>
	);
}

export default App;
