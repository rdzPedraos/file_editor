import PropTypes from 'prop-types';
import { repeatValue } from '../../utils/etc';

function TableRow({ cols, children, className = '' }) {
	return (
		<div
			className={'grid w-full ' + className}
			style={{
				gridTemplateColumns: repeatValue('1fr', cols ?? children.length),
			}}
		>
			{children}
		</div>
	);
}

TableRow.propTypes = {
	children: PropTypes.node,
	cols: PropTypes.number,
	className: PropTypes.string,
	onDelete: PropTypes.func,
};

export default TableRow;
