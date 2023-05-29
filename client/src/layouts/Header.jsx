import PropTypes from 'prop-types';
import Box from '../components/Box';
import Logo from '../components/Logo';
import { typesMetadata } from '../utils/fileTypes';
import { Link, useLocation } from 'react-router-dom';

function Header({ className }) {
	const location = useLocation();
	return (
		<Box
			Type='header'
			className={`flex items-center justify-between ${className}`}
		>
			<Logo size='md' />

			<div className='flex gap-2'>
				{Object.values(typesMetadata).map((type, key) => (
					<div
						key={key}
						className={`py-2 px-3 rounded shadow text-md transition-all ${
							location.pathname === type.pageUrl
								? 'translate-y-2 scale-95'
								: 'hover:translate-y-1'
						}`}
						style={{ backgroundColor: type.bgColor, color: type.txtColor }}
					>
						<Link to={type.pageUrl}>{type.text}</Link>
					</div>
				))}
			</div>
		</Box>
	);
}

Header.propTypes = {
	className: PropTypes.string,
};

export default Header;
