import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import FileProvider from './context/FileContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<FileProvider>
		<App />
	</FileProvider>
);
