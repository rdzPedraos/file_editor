import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { CheckIcon } from '@heroicons/react/24/outline';

const styles = {
	title: 'font-semibold text-xl',
	content: '',
};

function FieldTable({
	onEdit,
	text,
	type = 'content',
	className = '',
	...props
}) {
	const inputRef = useRef();
	const [editMode, setEditMode] = useState(false);
	const [value, setValue] = useState(text);

	useEffect(() => {
		if (editMode) {
			inputRef.current.focus();
		}
	}, [editMode]);

	useEffect(() => {
		setValue(text);
	}, [text]);

	const onDoubleClick = () => {
		if (onEdit !== null) {
			setEditMode(true);
		}
	};

	const saveValue = e => {
		e.preventDefault();
		onEdit(value);
		setEditMode(false);
	};

	return (
		<div
			className={`
                py-2 px-3 border-[1px] min-h-[50px] overflow-hidden
                ${styles[type]} ${className}
            `}
			{...props}
			onDoubleClick={onDoubleClick}
		>
			{editMode ? (
				<form onSubmit={saveValue} className='relative w-full h-full'>
					<input
						type='text'
						className='h-full w-full outline-none'
						value={value}
						onChange={e => setValue(e.target.value)}
						ref={inputRef}
					/>

					<Button
						className='absolute right-0 top-0 bottom-0'
						size='sm'
						style='info'
						type='submit'
					>
						<CheckIcon className='w-5 h-5' />
					</Button>
				</form>
			) : (
				<p className='first-letter:uppercase lowercase text-left'>{value}</p>
			)}
		</div>
	);
}

FieldTable.propTypes = {
	text: PropTypes.string,
	onEdit: PropTypes.func,
	type: PropTypes.oneOf(['title', 'content']),
	className: PropTypes.string,
};

export default FieldTable;
