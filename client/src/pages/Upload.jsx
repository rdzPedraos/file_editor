import FileUpload from '../components/FileUpload';
import Box from '../components/Box';

function Upload() {
	return (
		<div className='md:pt-6 lg:pt-28'>
			<Box className='max-w-screen-md mx-auto'>
				<p className='text-xl font-semibold mb-4'>Subir archivo</p>
				<FileUpload className='min-h-[500px]' />
			</Box>
		</div>
	);
}

export default Upload;
