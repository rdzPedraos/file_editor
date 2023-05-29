import { useContext } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import Box from '../components/Box';
import { FileContext } from '../context/FileContext';

function EditTxt() {
	const { data } = useContext(FileContext);

	let ckeditor = null;

	return (
		<div className='md:pt-6 xl:pt-24 md:px-6'>
			<Box className='max-w-6xl mx-auto bg-gray-50'>
				<p className='text-2xl font-semibold text-primary'>
					Editar archivos de word y texto
				</p>
				<p className='text-md text-secondary mb-8'>
					Edita el archivo de texto y descarga el resultado.{' '}
					<strong>¡Es hora de que escribas algo increíble!</strong>
				</p>
				<div className='bg-white'>
					<CKEditor
						onReady={editor => {
							// Insert the toolbar before the editable area.
							editor.ui
								.getEditableElement()
								.parentElement.insertBefore(
									editor.ui.view.toolbar.element,
									editor.ui.getEditableElement()
								);

							ckeditor = editor;
						}}
						onError={(error, { willEditorRestart }) => {
							// If the editor is restarted, the toolbar element will be created once again.
							// The `onReady` callback will be called again and the new toolbar will be added.
							// This is why you need to remove the older toolbar.
							if (willEditorRestart) {
								ckeditor?.ui.view.toolbar.element.remove();
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
