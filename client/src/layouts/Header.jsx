import PropTypes from 'prop-types';

import Box from '../components/Box';
import Logo from '../components/Logo';

function Header({ className }) {
	return (
		<Box
			Type='header'
			className={`flex items-center justify-between ${className}`}
		>
			<Logo size='md' />
		</Box>
	);
}

Header.propTypes = {
	className: PropTypes.string,
};

export default Header;
