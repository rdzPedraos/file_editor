/*import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';*/

function EditTxt() {
	return (
		<div>
			Edit a txt
			{/*<CKEditor
				onReady={editor => {
					// Insert the toolbar before the editable area.
					editor.ui
						.getEditableElement()
						.parentElement.insertBefore(
							editor.ui.view.toolbar.element,
							editor.ui.getEditableElement()
						);

					this.editor = editor;
				}}
				onError={(error, { willEditorRestart }) => {
					// If the editor is restarted, the toolbar element will be created once again.
					// The `onReady` callback will be called again and the new toolbar will be added.
					// This is why you need to remove the older toolbar.
					if (willEditorRestart) {
						this.editor.ui.view.toolbar.element.remove();
					}
				}}
				onChange={(event, editor) => console.log({ event, editor })}
				editor={DecoupledEditor}
				data="<p>Hello from CKEditor 5's decoupled editor!</p>"
			/>*/}
		</div>
	);
}

export default EditTxt;
