import { useEffect, useState } from 'react';
import './App.css';

import axios from 'axios';

/*import FileUpload from './components/FileUpload';
import FileDisplay from './components/FileDisplay';*/

function App() {
	const [data, setData] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);

	useEffect(() => {
		axios.get('/api').then(data => console.log(data));
	}, []);

	return (
		<>
			<div className='App'>
				<header className='App-header'>
					<p>{!data ? 'Loading...' : JSON.stringify(data)}</p>
				</header>
				<body>
					<h1>File Management App</h1>
					{/*<FileUpload setSelectedFile={setSelectedFile} />
					<FileDisplay selectedFile={selectedFile} />*/}
				</body>
			</div>
		</>
	);
}

export default App;
