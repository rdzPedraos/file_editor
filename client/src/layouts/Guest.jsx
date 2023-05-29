import PropTypes from 'prop-types';
import Logo from '../components/Logo';
import Box from '../components/Box';

import svg from '../img/bg.svg';

function GuestLayout({ children, ...props }) {
	return (
		<div className='min-w-screen min-h-screen bg-base-light' {...props}>
			<Box Type='header' className='flex relative z-10 h-24 items-center'>
				<Logo size='md' />
			</Box>

			<main className='relative z-10 min-h-[calc(100vh-96px)] w-screen'>
				{children}
			</main>

			<div className='absolute top-0 right-0 bottom-0 left-0'>
				<img src={svg} className='w-full h-full object-cover' />
			</div>
		</div>
	);
}

GuestLayout.propTypes = {
	children: PropTypes.node,
};

export default GuestLayout;
