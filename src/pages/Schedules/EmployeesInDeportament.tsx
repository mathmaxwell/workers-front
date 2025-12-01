import { Box, Fab, Paper, useTheme } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslationStore } from '../../language/useTranslationStore'
import { useQuery } from '@tanstack/react-query'
import type { IEmployees } from '../../types/employees/employeesType'
import { useTokenStore } from '../../store/token/useTokenStore'
import { getEmployees } from '../../api/employeesInfo/employeesInfo'
import { useFilterModalStore } from '../../store/modal/useFilterModalStore'
import { SelectedType } from '../../types/filterType'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'

import { useEmployeesSchedule } from '../../store/modal/useEmployeesSchedule'
const EmployeesInDeportament = () => {
	const theme = useTheme()
	const navigate = useNavigate()
	const { token } = useTokenStore()
	const { depId } = useParams()
	const { t } = useTranslationStore()
	const { filter } = useFilterModalStore()
	const { setSelectedEmployees, openModal, selectedEmployees } =
		useEmployeesSchedule()
	const columns: GridColDef[] = [
		{
			field: 'full_name',
			headerName: t.full_name,
			width: 200,
			hideSortIcons: true,
			sortable: false,
		},
		{
			field: 'position',
			headerName: t.position,
			width: 150,
			hideSortIcons: true,
			sortable: false,
		},
		{
			field: 'phone_number',
			headerName: t.phone_number,
			width: 150,
			hideSortIcons: true,
			sortable: false,
		},
		{
			field: 'work_schedule',
			headerName: t.work_schedule,
			width: 200,
			hideSortIcons: true,
			sortable: false,
		},
	]

	const { data: employees } = useQuery<IEmployees[]>({
		queryKey: ['EmployeesInDeportament', token, depId],
		queryFn: async () => {
			if (!depId) {
				return []
			}
			const result = await getEmployees({
				token,
				page: 1,
				count: 500,
				sortField: SelectedType.department,
				sortAsc: true,
				filter,
			})
			return result || []
		},
		enabled: !!token || !!depId,
	})

	return (
		<>
			<Box
				sx={{
					height: '100%',
					width: '100%',

					bgcolor: theme.palette.background.default,
					borderRadius: 2,
					border: '1px solid',
					borderColor: theme.palette.primary.main,
				}}
			>
				{depId === undefined ? (
					t.select_department
				) : (
					<Box
						sx={{
							width: '100%',
							height: '100%',
							overflowY: 'auto',
							borderRadius: 2,
							position: 'relative',
						}}
					>
						<Fab
							color='primary'
							sx={{
								position: 'absolute',
								bottom: 16,
								right: 16,
								color: 'black',
								display: selectedEmployees.length > 0 ? 'flex' : 'none',
							}}
							onClick={() => {
								openModal()
							}}
						>
							<EditIcon />
						</Fab>

						<Paper sx={{ width: '100%' }}>
							<DataGrid
								rows={employees}
								columns={columns}
								checkboxSelection
								disableColumnMenu
								hideFooter
								onRowDoubleClick={e => {
									navigate(`/employees/${e.id}`)
								}}
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
				)}
			</Box>
		</>
	)
}

export default EmployeesInDeportament
