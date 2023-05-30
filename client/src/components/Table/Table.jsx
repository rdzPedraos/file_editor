import PropTypes from 'prop-types';
import TableRow from './Row';
import FieldTable from './Field';
import Button from '../Button';

import { XMarkIcon } from '@heroicons/react/24/outline';

function Table({ data, onEdit, onEditHeader, onDeleteRow, onDeleteColumn }) {
	const headers = Object.keys(data[0]);
	return (
		<div>
			<TableRow className={onDeleteRow ? 'pr-[42px]' : ''}>
				{headers.map((value, key) => (
					<div key={key}>
						{onDeleteColumn && (
							<Button
								size={null}
								style='secondary'
								className='block py-1 px-1 mx-auto mb-2'
								onClick={() => onDeleteColumn(value)}
							>
								<XMarkIcon className='w-5 h-5' />
							</Button>
						)}
						<FieldTable
							type='title'
							text={value}
							onEdit={
								onEditHeader
									? new_header => onEditHeader(value, new_header)
									: null
							}
						/>
					</div>
				))}
			</TableRow>

			{data.map((row, rowId) => (
				<div
					key={rowId}
					className={
						onDeleteRow
							? 'grid grid-cols-[1fr_30px] gap-3 items-center'
							: 'w-full'
					}
				>
					<TableRow>
						{headers.map((header, id) => (
							<FieldTable
								key={id}
								type={'content'}
								onEdit={onEdit ? value => onEdit(rowId, header, value) : null}
								text={row[header]}
							/>
						))}
					</TableRow>

					{onDeleteRow && (
						<Button
							size={null}
							style='secondary'
							className='py-1 px-1'
							onClick={() => onDeleteRow(rowId)}
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
	data: PropTypes.arrayOf(PropTypes.object),
	onEdit: PropTypes.func,
	onEditHeader: PropTypes.func,
	onDeleteRow: PropTypes.func,
	onDeleteColumn: PropTypes.func,
};

export default Table;
