import PropTypes from 'prop-types';

function Box({ Type = 'div', className = '', children, ...props }) {
	return (
		<Type className={`p-5 bg-white shadow ${className}`} {...props}>
			{children}
		</Type>
	);
}

Box.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	Type: PropTypes.string,
};

export default Box;
