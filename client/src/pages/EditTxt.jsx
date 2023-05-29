import { useContext } from 'react';

import { FileContext } from '../context/FileContext';

function EditTxt() {
	const { data } = useContext(FileContext);

	return <div className='m-6 bg-white'></div>;
}

export default EditTxt;
