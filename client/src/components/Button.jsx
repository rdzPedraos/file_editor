import PropTypes from 'prop-types';

const styles = {
	primary: 'bg-primary-light text-white',
	secondary: 'bg-secondary-light text-secondary',
	info: 'bg-info-light text-info',
};

const sizes = {
	sm: 'px-2 text-sm',
	md: 'py-2 px-3 text-lg',
	null: '',
};

function Button({
	children,
	size = 'md',
	style = 'primary',
	className = '',
	...props
}) {
	return (
		<button
			className={`
                rounded font-medium
                transition-all hover:bg-opacity-50 hover:shadow
                active:-translate-y-1 active:shadow-none
                ${styles[style]} ${sizes[size]} ${className}
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
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Button;
