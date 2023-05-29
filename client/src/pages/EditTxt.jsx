import { useContext, useEffect, useRef } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import { FileContext } from '../context/FileContext';

function EditTxt() {
	const { data } = useContext(FileContext);

	let ckeditor = null;

	return (
		<div className='m-6 bg-white'>
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
				config={''}
			/>
		</div>
	);
}

export default EditTxt;
