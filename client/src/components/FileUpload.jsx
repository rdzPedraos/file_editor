import { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import { FileContext } from '../context/FileContext';

import {
	ArrowsPointingInIcon,
	CloudIcon,
	DocumentArrowUpIcon,
} from '@heroicons/react/24/outline';

const FileUpload = ({ className = '' }) => {
	const inputRef = useRef();
	const [drag, setDrag] = useState(null);
	const { setFile, loading, error } = useContext(FileContext);

	const onDragEnter = () => setDrag(true);
	const onDragExit = () => setDrag(false);
	const onDragOver = e => {
		e.preventDefault();
	};
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
			className={
				`flex flex-col items-center justify-center p-5 border-2 border-dashed ${className} ` +
				(drag ? 'text-info border-info bg-info-light' : 'text-secondary')
			}
			{...{ onDragEnter, onDragExit, onDragOver, onDrop }}
		>
			{loading ? (
				<p>
					<CloudIcon className='animate-bounce' />
					Cargando...
				</p>
			) : (
				<>
					<input
						type='file'
						className='hidden'
						onChange={onDrop}
						ref={inputRef}
					/>

					{drag ? (
						<ArrowsPointingInIcon className='w-16 h-16' />
					) : (
						<DocumentArrowUpIcon className='w-16 h-16' />
					)}

					<p className='text-center my-5'>
						<span className='block text-2xl font-semibold'>
							{drag ? 'Suelta' : 'Arrastra'} el archivo aquí
						</span>
						Archivos soportados: .xlm, .csv, .docx, .txt
					</p>

					{!drag && (
						<>
							<Button
								style='secondary'
								onClick={() => inputRef.current.click()}
							>
								Escoger archivo
							</Button>

							<p className='text-sm'>Peso máximo del archivo: 5MB</p>
						</>
					)}

					{error && (
						<p className='my-5 text-red-500 after:content-["*"]'>{error}</p>
					)}
				</>
			)}
		</div>
	);
};

FileUpload.propTypes = {
	className: PropTypes.string,
};

export default FileUpload;
