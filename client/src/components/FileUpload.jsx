import { useState, useRef, useContext } from 'react';
import { FileContext } from '../context/FileContext';
//import axios from 'axios';

const FileUpload = () => {
	const { setFile } = useContext(FileContext);
	const inputRef = useRef();
	const [drag, setDrag] = useState(null);

	const onDragEnter = () => setDrag(true);
	const onDragExit = () => setDrag(false);
	const onDragOver = e => e.preventDefault();
	const onDrop = e => {
		e.preventDefault();
		const file = e.dataTransfer
			? Array.from(e.dataTransfer.files)[0]
			: e.target.files[0];

		setFile(file);
		setDrag(false);
	};

	return (
		<div
			className='bg-gray-400 h-[100px] w-[100px]'
			{...{ onDragEnter, onDragExit, onDragOver, onDrop }}
		>
			<input type='file' className='hidden' ref={inputRef} onChange={onDrop} />
			{drag && <p>Esta haciendo drag</p>}
			Archivo
			<button onClick={() => inputRef.current.click()}>
				Clic aquí o arrastra un archivo!{' '}
			</button>
		</div>
	);
};

export default FileUpload;
