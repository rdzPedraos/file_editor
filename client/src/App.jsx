import { Route, Routes } from 'react-router-dom';

import Upload from './pages/Upload';
import EditCsv from './pages/EditCsv';
import GuestLayout from './layouts/guest';

function App() {
	return (
		<GuestLayout
			onDragOver={e => e.preventDefault()}
			onDrop={e => e.preventDefault()}
		>
			<Routes>
				<Route path='/' exact element={<Upload />} />
				<Route path='/csv' element={<EditCsv />} />
			</Routes>
		</GuestLayout>
	);
}

export default App;
