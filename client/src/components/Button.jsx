import PropTypes from 'prop-types';

const styles = {
	primary: 'bg-primary-light text-white',
	secondary: 'bg-secondary-light text-secondary',
	info: 'bg-info-light text-info',
};

function Button({ children, style = 'primary', className = '', ...props }) {
	return (
		<button
			className={`
                px-4 py-2 rounded font-medium
                transition-all hover:bg-opacity-50 hover:shadow
                active:-translate-y-1 active:shadow-none
                ${styles[style]} ${className}
            `}
			{...props}
		>
			{children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	style: PropTypes.oneOf(['primary', 'secondary', 'info']),
};

export default Button;
