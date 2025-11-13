import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	useTheme,
} from '@mui/material'
import { useTranslationStore } from '../../language/useTranslationStore'
import { useQuery } from '@tanstack/react-query'
import type { IEmployees } from '../../types/employees/employeesType'
import { useTokenStore } from '../../store/token/useTokenStore'
import {
	getEmployees,
	getEmployeesCount,
} from '../../api/employeesInfo/employeesInfo'
import { useState } from 'react'
import { useShowListStore } from '../../store/list/useListStore'
import { SelectedType } from '../../types/filterType'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'
const EmployeesList = () => {
	const { token } = useTokenStore()
	const { t } = useTranslationStore()
	const theme = useTheme()
	const navigate = useNavigate()
	const [page, setPage] = useState<number>(0)
	const [rowsPerPage, setRowsPerPage] = useState<number>(10)
	const handleChangePage = (
		_: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}
	const { filter, setFilter } = useShowListStore()

	const { data: Employees } = useQuery<IEmployees[], Error>({
		queryKey: [
			'Employees',
			token,
			page,
			rowsPerPage,
			filter.sortField,
			filter.sortAsc,
		],
		queryFn: async () => {
			const result = await getEmployees({
				token,
				page,
				count: rowsPerPage,
				sortField: filter.sortField,
				sortAsc: filter.sortAsc,
			})
			return result || []
		},
		enabled: !!token,
	})
	const { data: EmployeesCount } = useQuery<number, Error>({
		queryKey: ['EmployeesCount', token],
		queryFn: async () => {
			const result = await getEmployeesCount({
				token,
			})
			return result
		},
		enabled: !!token,
	})

	const columns: {
		key: SelectedType
		label: string
		visible: boolean
		sortable: boolean
	}[] = [
		{
			key: SelectedType.full_name,
			label: t.full_name,
			visible: filter.full_name,
			sortable: true,
		},
		{
			key: SelectedType.image,
			label: t.image,
			visible: filter.image,
			sortable: false,
		},
		{
			key: SelectedType.PINFL,
			label: t.PINFL,
			visible: filter.PINFL,
			sortable: true,
		},

		{
			key: SelectedType.date_of_birth,
			label: t.date_of_birth,
			visible: filter.date_of_birth,
			sortable: true,
		},
		{
			key: SelectedType.department,
			label: t.department,
			visible: filter.department,
			sortable: false,
		},
		{
			key: SelectedType.gender,
			label: t.gender,
			visible: filter.gender,
			sortable: false,
		},
		{
			key: SelectedType.nationality,
			label: t.nationality,
			visible: filter.nationality,
			sortable: true,
		},
		{
			key: SelectedType.passport_series_and_number,
			label: t.passport_series_and_number,
			visible: filter.passport_series_and_number,
			sortable: true,
		},
		{
			key: SelectedType.position,
			label: t.position,
			visible: filter.position,
			sortable: true,
		},
		{
			key: SelectedType.work_schedule,
			label: t.work_schedule,
			visible: filter.work_schedule,
			sortable: false,
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
					overflowY: 'auto',
					borderRadius: 2,
					position: 'relative',
				}}
			>
				<TableContainer sx={{ overflowY: 'auto', height: '82vh' }}>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead>
							<TableRow>
								{columns.map(
									col =>
										col.visible && (
											<TableCell
												key={col.key}
												onClick={() =>
													col.sortable &&
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
							{Employees ? (
								Employees.map((emp, index) => (
									<TableRow
										key={emp.id || index}
										onClick={() => {
											navigate(`/employees/${emp.id}`)
										}}
									>
										{columns.map(
											col =>
												col.visible &&
												(col.key === 'image' ? (
													<TableCell key={col.key}>
														<img src={emp.image} alt='image' />
													</TableCell>
												) : col.key === 'gender' ? (
													<TableCell key={col.key}>{t[emp.gender]}</TableCell>
												) : col.key === 'work_schedule' ? (
													<TableCell key={col.key}>
														{t[emp.work_schedule]}
													</TableCell>
												) : col.key === 'date_of_birth' ? (
													<TableCell key={col.key}>
														{emp.date_of_birth}.{emp.birth_month}.
														{emp.year_of_birth}
													</TableCell>
												) : (
													<TableCell key={col.key}>
														{emp[col.key as keyof typeof emp]}
													</TableCell>
												))
										)}
									</TableRow>
								))
							) : (
								<Loading />
							)}
						</TableBody>
					</Table>
					<TablePagination
						labelRowsPerPage={t.rows_per_page}
						component='div'
						count={EmployeesCount || 0}
						page={page}
						onPageChange={handleChangePage}
						rowsPerPage={rowsPerPage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</TableContainer>
			</Paper>
		</Box>
	)
}

export default EmployeesList
