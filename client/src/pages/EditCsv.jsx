import { useContext, useEffect } from 'react';

import { FileContext } from '../context/FileContext';
import { downloadFile } from '../utils/fileTypes';

import Box from '../components/Box';
import Button from '../components/Button';
import Table from '../components/Table/Table';

function EditCsv() {
	const { data, setData } = useContext(FileContext);

	useEffect(() => {
		if (!data) {
			setData([{ '': '' }]);
		} else {
			const lastRowIsEmpty = Object.values(data[data.length - 1]).every(
				value => value === ''
			);

			const headers = Object.keys(data[0]);
			const lastColumnIsEmpty = headers[headers.length - 1] === '';

			if (!lastRowIsEmpty) {
				setData(prev => [
					...prev,
					Object.keys(data[0]).reduce(
						(acc, key) => ({ ...acc, [key]: '' }),
						{}
					),
				]);
			}

			if (!lastColumnIsEmpty) {
				setData(prev => prev.map(row => ({ ...row, '': '' })));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const onEditHeader = (current_header, new_header) => {
		setData(prev =>
			prev.map(row => {
				const entries = Object.entries(row);
				const newEntries = entries.map(([header, value]) => [
					header === current_header ? new_header : header,
					value,
				]);
				return Object.fromEntries(newEntries);
			})
		);
	};

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

	const onDeleteColumn = col => {
		setData(prev =>
			prev.map(row => {
				const newRow = { ...row };
				delete newRow[col];
				return newRow;
			})
		);
	};

	const exportData = () => {
		const dataToSend = JSON.parse(JSON.stringify(data));
		dataToSend.pop();
		dataToSend.map(row => {
			delete row[''];
			return row;
		});

		const csvContent =
			Object.keys(dataToSend[0]).join(',') +
			'\n' +
			dataToSend.map(row => Object.values(row).join(',')).join('\n');

		downloadFile(csvContent, 'file.csv');
	};

	return (
		<div className='md:pt-6 xl:pt-24 md:px-6'>
			<Box className='max-w-6xl mx-auto'>
				<Button onClick={exportData} className='float-right'>
					Export
				</Button>

				<p className='text-2xl font-semibold'>Editar CSV</p>
				<p className='text-md text-secondary mb-8'>
					Aqui puedes editar tú información y exportarla en formato csv.
					{data?.length <= 1 &&
						' Escribe algo en la casilla inferior y empieza a crear tú estructura!'}
				</p>
				{data && (
					<Table
						data={data}
						onEdit={onEditField}
						onEditHeader={onEditHeader}
						onDeleteRow={onDeleteRow}
						onDeleteColumn={onDeleteColumn}
					/>
				)}
			</Box>
		</div>
	);
}

export default EditCsv;
