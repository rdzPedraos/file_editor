import { useContext, useRef } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import axios from 'axios';

import html2pdf from 'html2pdf.js';

import Box from '../components/Box';
import Button from '../components/Button';
import { FileContext } from '../context/FileContext';
import { downloadFile } from '../utils/fileTypes';

const handlePdfDownload = ref => {
	// Get the HTML content from CKEditor
	const htmlContent = ref.current.getData();

	// Convert HTML to PDF using html2pdf.js
	html2pdf()
		.set({
			margin: 1,
			filename: 'file.pdf',
			image: { type: 'jpeg', quality: 1 },
			jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
		})
		.from(htmlContent)
		.to('pdf')
		.save();
};

const handleTextDownload = async ref => {
	const editorInstance = ref.current;
	const html = editorInstance.getData();

	await axios
		.post('/api/convert/html-txt', { html })
		.then(response => {
			downloadFile(response.data, 'file.txt');
		})
		.catch(error => {
			console.error('Error downloading file:', error);
		});
};

function EditTxt() {
	const { data } = useContext(FileContext);

	const ckeditor = useRef(null);

	return (
		<div className='md:pt-6 xl:pt-24 md:px-6'>
			<Box className='bg-white rounded drop-shadow max-w-6xl mx-auto p-12'>
				<div className='flex gap-3'>
					<div>
						<p className='text-2xl font-semibold'>
							Editar archivos de word y texto
						</p>
						<p className='text-md text-secondary mb-8'>
							Edita el archivo de texto y descarga el resultado.{' '}
							<strong>¡Es hora de que escribas algo increíble!</strong>
						</p>
					</div>

					<div className='flex-1'>
						<div className='flex justify-end gap-3'>
							<Button
								style='primary'
								className='flex gap-2'
								onClick={() => {
									handlePdfDownload(ckeditor);
								}}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='w-6 h-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
									/>
								</svg>
								Exportar a PDF
							</Button>
							<Button
								style='info'
								className='flex gap-2'
								onClick={() => {
									handleTextDownload(ckeditor);
								}}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='w-6 h-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
									/>
								</svg>
								Descargar txt
							</Button>
						</div>
					</div>
				</div>
				<div className='bg-white outline outline-1 outline-gray-300 rounded-sm'>
					<CKEditor
						onReady={editor => {
							// Insert the toolbar before the editable area.
							editor.ui
								.getEditableElement()
								.parentElement.insertBefore(
									editor.ui.view.toolbar.element,
									editor.ui.getEditableElement()
								);

							ckeditor.current = editor;
						}}
						onError={(error, { willEditorRestart }) => {
							// If the editor is restarted, the toolbar element will be created once again.
							// The `onReady` callback will be called again and the new toolbar will be added.
							// This is why you need to remove the older toolbar.
							if (willEditorRestart) {
								ckeditor?.current.ui.view.toolbar.element.remove();
							}
						}}
						editor={DecoupledEditor}
						data={data || '<p>Escribe algo increíble!</p>'}
					/>
				</div>
			</Box>
		</div>
	);
}

export default EditTxt;
