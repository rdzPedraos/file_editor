import PropTypes from 'prop-types';
import img from '../img/mascot_2.png';
import { useNavigate } from 'react-router-dom';

const measures = {
	sm: '',
	md: {
		img: 'h-16',
		title: 'text-5xl font-bold',
	},
	lg: '',
};

function Logo({ size }) {
	const navigate = useNavigate();
	const { img: imgMeasures, title: titleMeasures } = measures[size];

	return (
		<div
			className='flex items-center cursor-pointer'
			onClick={() => navigate('/')}
		>
			<p className={`text-primary-light ${titleMeasures}`}>M</p>
			<img src={img} alt='icon' className={imgMeasures} />
			<p className={`text-primary-light ${titleMeasures}`}>pache</p>
		</div>
	);
}

Logo.propTypes = {
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Logo;
