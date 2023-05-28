import PropTypes from 'prop-types';
import Logo from '../components/Logo';
import Box from '../components/Box';

import svg from '../img/bg.svg';

function GuestLayout({ children }) {
	return (
		<div className='min-w-screen min-h-screen bg-base-light'>
			<Box Type='header' className='flex h-24 items-center'>
				<Logo size='md' />
			</Box>

			<main className='relative min-h-[calc(100vh-96px)] w-screen'>
				{children}

				<div className='absolute top-0 right-0 bottom-0 left-0'>
					<img src={svg} className='w-full h-full object-cover' />
				</div>
			</main>
		</div>
	);
}

GuestLayout.propTypes = {
	children: PropTypes.node,
};

export default GuestLayout;
