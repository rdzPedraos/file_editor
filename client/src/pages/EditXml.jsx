import { useContext, useRef } from 'react';

import Editor from '@monaco-editor/react';

import axios from 'axios';

import { FileContext } from '../context/FileContext';
import Box from '../components/Box';
import Button from '../components/Button';

import { downloadFile } from '../utils/fileTypes';

function EditXml() {
	const { data } = useContext(FileContext);
	const editorRef = useRef();

	async function downloadJson() {
		const xml = editorRef.current.getValue();
		const response = await axios.post('/api/convert/xml-json', { xml });
		downloadFile(JSON.stringify(response.data), 'file.json');
	}

	async function downloadXML() {
		const xml = editorRef.current.getValue();
		downloadFile(xml, 'file.xml');
	}

	return (
		<div className='md:pt-6 xl:pt-24 md:px-6 h-full'>
			<Box className='max-w-6xl mx-auto p-12'>
				<div className='float-right flex gap-5'>
					<Button style='info' onClick={downloadXML}>
						Exportar a XML
					</Button>
					<Button style='secondary' onClick={downloadJson}>
						Exportar a JSON
					</Button>
				</div>

				<p className='text-2xl font-semibold'>Editor XML</p>
				<p className='text-md'>Edita tu documento aquí y descargalo</p>

				<Editor
					className='shadow mt-8 rounded-lg overflow-hidden h-full lg:h-[500px]'
					defaultLanguage='xml'
					defaultValue={data || ''}
					onMount={editor => {
						editorRef.current = editor;
					}}
					theme='vs-dark'
				/>
			</Box>
		</div>
	);
}

export default EditXml;
