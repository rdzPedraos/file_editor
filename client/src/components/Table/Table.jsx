import PropTypes from 'prop-types';
import TableRow from './Row';
import FieldTable from './Field';
import Button from '../Button';

import { XMarkIcon } from '@heroicons/react/24/outline';

function Table({ data, onEdit, onDeleteRow, onDeleteColumn }) {
	const classNameRow = 'grid grid-cols-[1fr_30px] gap-3 items-center';
	return (
		<div>
			{onDeleteColumn && (
				<div className={classNameRow}>
					<TableRow className='mb-2'>
						{Array.from(
							{ length: data[0].length },
							(_, index) =>
								index + 1 !== data[0].length && (
									<Button
										key={index}
										size={null}
										style='secondary'
										className='py-1 px-1 mx-auto'
										onClick={() => onDeleteColumn(index)}
									>
										<XMarkIcon className='w-5 h-5' />
									</Button>
								)
						)}
					</TableRow>
				</div>
			)}

			{data.map((row, key) => (
				<div key={key} className={classNameRow}>
					<TableRow>
						{row.map((value, col) => (
							<FieldTable
								key={col}
								type={key == 0 ? 'title' : 'content'}
								onEdit={onEdit ? value => onEdit(key, col, value) : null}
								text={value}
							/>
						))}
					</TableRow>

					{onDeleteRow && !(key + 1 === data.length) && (
						<Button
							size={null}
							style='secondary'
							className='py-1 px-1'
							onClick={() => onDeleteRow(key)}
						>
							<XMarkIcon className='w-5 h-5' />
						</Button>
					)}
				</div>
			))}
		</div>
	);
}

Table.propTypes = {
	data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
	onEdit: PropTypes.func,
	onDeleteRow: PropTypes.func,
	onDeleteColumn: PropTypes.func,
};

export default Table;
