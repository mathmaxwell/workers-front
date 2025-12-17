import {
	Box,
	Paper,
	useTheme,
	InputBase,
	IconButton,
	ButtonGroup,
	Button,
} from '@mui/material'
import SiteBar from '../../components/SiteBar'
import { useTokenStore } from '../../store/token/useTokenStore'
import { useEffect } from 'react'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import { useNavigate } from 'react-router-dom'
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField'
import { useQuery } from '@tanstack/react-query'
import type {
	IEmployees,
	IEmployeesCount,
} from '../../types/employees/employeesType'
import {
	deleteEmployee,
	employeesCount,
	getEmployees,
	updateEmployees,
} from '../../api/employeesInfo/employeesInfo'
import { useFilterModalStore } from '../../store/modal/useFilterModalStore'
import { SelectedType } from '../../types/filterType'
import {
	DataGrid,
	type GridColDef,
	type GridPaginationModel,
} from '@mui/x-data-grid'
import { useTranslationStore } from '../../language/useTranslationStore'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs, { Dayjs } from 'dayjs'
const Admin = () => {
	const { t } = useTranslationStore()
	const theme = useTheme()
	const { userRole, token } = useTokenStore()
	const navigate = useNavigate()
	const { filter, resetFilter, setFilter } = useFilterModalStore()
	const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
		page: 0,
		pageSize: 10,
	})
	const { data: employees, isLoading } = useQuery<IEmployees[], Error>({
		queryKey: [
			'EmployeesForAdmin',
			token,
			paginationModel.page,
			paginationModel.pageSize,
			filter.full_name,
		],
		queryFn: async () => {
			const result = await getEmployees({
				token,
				page: paginationModel.page,
				count: paginationModel.pageSize,
				sortField: SelectedType.full_name,
				sortAsc: true,
				filter: filter,
			})
			return result
		},
		enabled: !!token,
	})
	const { data: EmployeesCount } = useQuery<IEmployeesCount, Error>({
		queryKey: ['EmployeesCount', token],
		queryFn: async () => {
			const now = new Date()
			const result = await employeesCount({
				token,
				day: now.getDay(),
				month: now.getMonth() + 1,
				year: now.getFullYear(),
			})
			return result
		},
		enabled: !!token,
	})
	const rowCount = EmployeesCount?.total_employees ?? 0
	useEffect(() => {
		resetFilter()
		if (userRole !== '1') {
			navigate('/')
		}
	}, [])
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 270 },
		{ field: 'full_name', headerName: t.full_name, width: 200, sortable: true },
		{ field: 'department', headerName: t.department, width: 180 },
		{ field: 'position', headerName: t.position, width: 150 },
		{ field: 'work_schedule', headerName: t.work_schedule, width: 200 },
		{ field: 'accepted', headerName: t.accept, width: 110 },
	]
	const [selectedEmployees, setSelectedEmployees] = useState<IEmployees[]>([])

	const [date, setDate] = useState<Dayjs | null>(dayjs())
	// console.log('year', date?.year())
	// console.log('month', date?.month()) // +1
	// console.log('date', date?.date())
	// console.log('hour', date?.hour())
	// console.log('minute', date?.minute())
	async function handleDelete() {
		try {
			for (const employee of selectedEmployees) {
				await deleteEmployee({
					token,
					id: employee.id,
				})
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Box
			sx={{
				position: 'relative',
				height: '100vh',
				width: '100vw',
				p: '20px',
				bgcolor: theme.palette.background.default,
				display: 'flex',
				alignItems: 'start',
				justifyContent: 'start',
				gap: '20px',
			}}
		>
			<SiteBar />
			<Box
				sx={{
					width: 'calc(100vw - 310px)',
					display: 'flex',
					flexDirection: 'column',
					gap: '20px',
				}}
			>
				<Box
					sx={{
						borderRadius: 2,
						border: '1px solid',
						borderColor: theme.palette.primary.main,
						p: '10px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '20px',
						width: '100%',
						height: '85px',
					}}
				>
					<Paper
						onSubmit={e => {
							e.preventDefault()
						}}
						component='form'
						sx={{
							display: 'flex',
							alignItems: 'center',
							width: 350,
							border: '1px solid',
							borderColor: theme.palette.primary.main,
							boxShadow: 0,
						}}
					>
						<InputBase
							value={filter.full_name}
							onChange={e => {
								setFilter({ full_name: e.target.value })
							}}
							sx={{ ml: 2, flex: 1 }}
							placeholder={t.search_by_name}
						/>
						<IconButton color='primary' sx={{ p: '4px' }}>
							<ManageSearchIcon />
						</IconButton>
					</Paper>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={['DateTimeField']}>
							<DateTimeField
								label={t.select_time}
								value={date}
								onChange={newValue => setDate(newValue)}
								format='DD/MM/YYYY HH:mm'
							/>
						</DemoContainer>
					</LocalizationProvider>
				</Box>
				<Box
					sx={{
						width: '100%',
						height: 'calc(100vh - 85px - 40px - 85px - 40px )',
						bgcolor: theme.palette.background.paper,
						border: '1px solid',
						borderColor: theme.palette.primary.main,
					}}
				>
					<Paper>
						<DataGrid
							rows={employees}
							columns={columns}
							loading={isLoading}
							rowCount={rowCount}
							paginationMode='server'
							sortingMode='client'
							pageSizeOptions={[5, 10, 25, 50, 100]}
							paginationModel={paginationModel}
							onPaginationModelChange={setPaginationModel}
							checkboxSelection
							sx={{ border: 0 }}
							onRowSelectionModelChange={selectionModel => {
								if (selectionModel.type === 'include') {
									const idsArray = Array.from(selectionModel.ids) as string[]
									const selectedEmployeesData =
										employees?.filter(emp => idsArray.includes(emp.id)) || []
									setSelectedEmployees(selectedEmployeesData)
								}
								if (selectionModel.type === 'exclude') {
									const excluded = Array.from(selectionModel.ids) as string[]
									const selectedEmployeesData =
										employees?.filter(emp => !excluded.includes(emp.id)) || []
									setSelectedEmployees(selectedEmployeesData)
								}
							}}
						/>
					</Paper>
				</Box>
				<Box
					sx={{
						borderRadius: 2,
						border: '1px solid',
						borderColor: theme.palette.primary.main,
						p: '10px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '20px',
						width: '100%',
						height: '85px',
					}}
				>
					<Button
						onClick={() => {
							handleDelete()
						}}
						variant='outlined'
						color='error'
					>
						{t.delete}
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

export default Admin
