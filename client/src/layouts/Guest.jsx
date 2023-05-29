import PropTypes from 'prop-types';

import svg from '../img/bg.svg';
import Header from './Header';

function GuestLayout({ children, ...props }) {
	return (
		<div className='min-w-screen min-h-screen bg-base-light' {...props}>
			<Header className='relative z-10 h-24' />

			<main className='relative z-10 min-h-[calc(100vh-96px)] w-screen'>
				{children}
			</main>

			<div className='absolute top-0 right-0 bottom-0 left-0 overflow-hidden'>
				<img
					src={svg}
					className='w-full h-full object-cover'
					style={{
						animation:
							'expand-collapse 40s cubic-bezier(.17,.84,.44,1) infinite',
						animationName: 'expand-collapse',
					}}
				/>
			</div>
		</div>
	);
}

GuestLayout.propTypes = {
	children: PropTypes.node,
};

export default GuestLayout;
