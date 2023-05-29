import Box from '../components/Box';
import { useContext, useEffect } from 'react';
import { FileContext } from '../context/FileContext';
import Table from '../components/Table/Table';

function EditCsv() {
	const { data, setData } = useContext(FileContext);

	useEffect(() => {
		if (data === null) {
			setData([['']]);
		} else {
			const lastRowIsEmpty = data[data.length - 1].every(value => value === '');
			const lastColumnIsEmpty = data.every(row => row[row.length - 1] === '');

			if (!lastRowIsEmpty) {
				setData(prev => [...prev, Array(prev[0].length).fill('')]);
			}

			if (!lastColumnIsEmpty) {
				setData(prev => prev.map(row => [...row, '']));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const onEditField = (row, col, value) => {
		setData(prev => {
			const updatedData = [...prev];
			updatedData[row][col] = value;
			return updatedData;
		});
	};

	const onDeleteRow = row => {
		setData(prev => prev.filter((_, index) => index !== row));
	};

	const onDeleteColumns = col => {
		setData(prev => prev.map(row => row.filter((_, index) => index !== col)));
	};

	return (
		<div className='md:pt-6 xl:pt-24 md:px-6'>
			<Box className='max-w-6xl mx-auto'>
				<p className='text-2xl font-semibold text-primary'>Editar CSV</p>
				<p className='text-md text-secondary mb-8'>
					Aqui puedes editar tú información y exportarla en formato csv.
					{data?.length <= 1 &&
						' Escribe algo en la casilla inferior y empieza a crear tú estructura!'}
				</p>
				{data && (
					<Table
						data={data}
						onEdit={onEditField}
						onDeleteRow={onDeleteRow}
						onDeleteColumn={onDeleteColumns}
					/>
				)}
			</Box>
		</div>
	);
}

export default EditCsv;
