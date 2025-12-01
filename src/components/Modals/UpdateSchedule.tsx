import {
	Box,
	Modal,
	Paper,
	Tab,
	Tabs,
	Typography,
	useTheme,
} from '@mui/material'
import { useTranslationStore } from '../../language/useTranslationStore'
import { useEmployeesSchedule } from '../../store/modal/useEmployeesSchedule'
import { useState } from 'react'
import { a11yProps, CustomTabPanel } from '../../functions/MuiFn'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import WeekSchedule from '../workSchedule/WeekSchedule'
import MonthSchedule from '../workSchedule/MonthSchedule'
import SelectPeriod from '../workSchedule/SelectPeriod'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

const UpdateSchedule = () => {
	const theme = useTheme()
	const { t } = useTranslationStore()
	const { isOpen, closeModal, selectedEmployees } = useEmployeesSchedule()
	const [value, setValue] = useState(0)
	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}
	const columns: GridColDef[] = [
		{
			field: 'full_name',
			headerName: t.full_name,
			width: 200,
			hideSortIcons: true,
			sortable: false,
		},
		{
			field: 'department',
			headerName: t.department,
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
			width: 200,
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
	const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date()))
	const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date()))

	return (
		<>
			<Modal
				open={isOpen}
				onClose={() => {
					closeModal()
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 1000,
						bgcolor: theme.palette.background.default,
						boxShadow: 24,
						borderRadius: 2,
						p: 3,
						border: '2px solid',
						borderColor: theme.palette.primary.main,
						color: theme.palette.text.primary,
						height: 700,
					}}
				>
					<Typography variant='h6' mb={2}>
						{t.change_schedule}
					</Typography>
					<Box sx={{ borderColor: 'divider' }}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label='basic tabs example'
						>
							<Tab label={t.selected_employees} {...a11yProps(0)} />
							<Tab label={t.configure_weekly} {...a11yProps(1)} />
							<Tab label={t.configure_monthly} {...a11yProps(2)} />
						</Tabs>
						<CustomTabPanel value={value} index={0}>
							<Paper sx={{ width: '100%', height: 530, overflowY: 'auto' }}>
								<DataGrid
									rows={selectedEmployees}
									columns={columns}
									disableColumnMenu
									hideFooter
								/>
							</Paper>
						</CustomTabPanel>
						<CustomTabPanel value={value} index={1}>
							<SelectPeriod
								startDate={startDate}
								endDate={endDate}
								setStartDate={setStartDate}
								setEndDate={setEndDate}
							/>
							<WeekSchedule startDate={startDate} endDate={endDate} />
						</CustomTabPanel>
						<CustomTabPanel value={value} index={2}>
							<SelectPeriod
								startDate={startDate}
								endDate={endDate}
								setStartDate={setStartDate}
								setEndDate={setEndDate}
							/>
							<MonthSchedule startDate={startDate} endDate={endDate} />
						</CustomTabPanel>
					</Box>
				</Box>
			</Modal>
		</>
	)
}

export default UpdateSchedule
