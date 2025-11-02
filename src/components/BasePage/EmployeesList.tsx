import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	useTheme,
} from '@mui/material'
import { useTranslationStore } from '../../language/useTranslationStore'
import { useQuery } from '@tanstack/react-query'
import type { IEmployees } from '../../types/employees/employeesType'
import { useTokenStore } from '../../store/token/useTokenStore'
import { getEmployees } from '../../api/employeesInfo/employeesInfo'
import { useState } from 'react'
import { useShowListStore } from '../../store/list/useListStore'
import { SelectedType } from '../../types/filterType'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
const EmployeesList = () => {
	const { token } = useTokenStore()
	const { t } = useTranslationStore()
	const theme = useTheme()
	const [page, setPage] = useState<number>(0)
	const count = 50
	const { filter, setFilter } = useShowListStore()
	const { data: Employees } = useQuery<IEmployees[], Error>({
		queryKey: ['Employees', token],
		queryFn: async () => {
			const result = await getEmployees({
				token,
				page,
				count,
				sortField: filter.sortField,
				sortAsc: filter.sortAsc,
			})
			return result || []
		},
		enabled: !!token,
	})
	const columns: {
		key: SelectedType
		label: string
		visible: boolean
	}[] = [
		{ key: SelectedType.name, label: t.full_name, visible: filter.name },
		{ key: SelectedType.image, label: t.image, visible: filter.image },
		{ key: SelectedType.PINFL, label: t.PINFL, visible: filter.PINFL },
		{
			key: SelectedType.date_of_birth,
			label: t.date_of_birth,
			visible: filter.date_of_birth,
		},
		{
			key: SelectedType.department,
			label: t.department,
			visible: filter.department,
		},
		{ key: SelectedType.gender, label: t.gender, visible: filter.gender },
		{
			key: SelectedType.nationality,
			label: t.nationality,
			visible: filter.nationality,
		},
		{
			key: SelectedType.passport_series_and_number,
			label: t.passport_series_and_number,
			visible: filter.passport_series_and_number,
		},
		{ key: SelectedType.position, label: t.position, visible: filter.position },
		{
			key: SelectedType.work_schedule,
			label: t.work_schedule,
			visible: filter.work_schedule,
		},
	]
	return (
		<Box
			sx={{
				width: '100%',
				height: 'calc(100vh - 145px)',
				borderRadius: 2,
				bgcolor: theme.palette.background.paper,
				border: '1px solid',
				borderColor: theme.palette.primary.main,
			}}
		>
			<Paper
				sx={{
					width: '100%',
					overflow: 'auto',
					borderRadius: 2,
				}}
			>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead>
							<TableRow>
								{columns.map(
									col =>
										col.visible && (
											<TableCell
												key={col.key}
												onClick={() =>
													setFilter({
														sortField: col.key,
														sortAsc:
															filter.sortField === col.key
																? !filter.sortAsc
																: true,
													})
												}
												sx={{
													cursor: 'pointer',
													fontWeight: 'bold',
													userSelect: 'none',
													position: 'relative',
												}}
											>
												{col.label}
												{filter.sortField === col.key ? (
													filter.sortAsc ? (
														<ArrowUpwardIcon sx={{ position: 'absolute' }} />
													) : (
														<ArrowDownwardIcon sx={{ position: 'absolute' }} />
													)
												) : (
													''
												)}
											</TableCell>
										)
								)}
							</TableRow>
						</TableHead>
						<TableBody>
							{Employees?.map((row, index) => {
								return (
									<TableRow hover role='checkbox' tabIndex={-1} key={index}>
										{filter.name && <TableCell>{row.fullName}</TableCell>}
										{filter.department && (
											<TableCell>{row.department}</TableCell>
										)}
										{filter.date_of_birth && (
											<TableCell>{row.date_of_birth}</TableCell>
										)}
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	)
}

export default EmployeesList
