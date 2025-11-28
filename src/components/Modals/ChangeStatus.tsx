import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	Stack,
	Typography,
	useTheme,
} from '@mui/material'
import { useTokenStore } from '../../store/token/useTokenStore'
import { useChangeStatus } from '../../store/modal/useChangeStatus'
import { useTranslationStore } from '../../language/useTranslationStore'
import { useQuery } from '@tanstack/react-query'
import { months, type IStatus } from '../../types/filterType'
import { useNavigate } from 'react-router-dom'
import {
	createStatus,
	getStatusById,
} from '../../api/employeesInfo/employeesInfo'
import ReadOnlyTexField from '../textField/ReadOnlyTexField'
import Line from '../Line'
import { useState } from 'react'
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 70 }, (_, i) => currentYear - i)
const ChangeStatus = () => {
	const [status, setStatus] = useState<
		'on_vacation' | 'on_sick_leave' | 'on_a_business_trip'
	>('on_vacation')
	const [startDay, setStartDay] = useState<number>()
	const [startMonth, setStartMonth] = useState<number>()
	const [startYear, setStartYear] = useState<number>()
	const [endDay, setEndDay] = useState<number>()
	const [endMonth, setEndMonth] = useState<number>()
	const [endYear, setEndYear] = useState<number>()
	const canSave: boolean =
		startDay != undefined &&
		startMonth != undefined &&
		startYear != undefined &&
		endDay != undefined &&
		endMonth != undefined &&
		endYear != undefined &&
		startDay + startMonth * 100 + startYear * 10000 <
			endDay + endMonth * 100 + endYear * 10000
	const theme = useTheme()
	const navigate = useNavigate()
	const { t } = useTranslationStore()
	const { token } = useTokenStore()
	const { id, isOpen, close } = useChangeStatus()
	const { data: EmployeeStatus } = useQuery<IStatus[], Error>({
		queryKey: ['EmployeeStatus', token, id],
		queryFn: async () => {
			if (!id) {
				navigate('/base')
				throw new Error('No id provided')
			}
			const result = await getStatusById({
				token,
				id,
			})
			return result
		},
		enabled: !!token && !!id,
	})
	return (
		<Modal open={isOpen} onClose={close}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 800,
					bgcolor: theme.palette.background.default,
					boxShadow: 24,
					borderRadius: 2,
					p: 3,
					border: '2px solid',
					borderColor: theme.palette.primary.main,
				}}
			>
				<Typography
					variant='h6'
					mb={2}
					sx={{ color: theme.palette.text.primary }}
				>
					{t.change_status}
				</Typography>
				{/* new  status*/}
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<Stack direction='row' spacing={1}>
						{/* День */}
						<FormControl fullWidth>
							<InputLabel>{t.start_day}</InputLabel>
							<Select
								value={startDay}
								label={t.start_day}
								onChange={e => {
									setStartDay(e.target.value)
								}}
							>
								{days.map(day => (
									<MenuItem key={day} value={day}>
										{day}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						{/* Месяц */}
						<FormControl fullWidth>
							<InputLabel>{t.start_month}</InputLabel>
							<Select
								value={startMonth}
								label={t.start_month}
								onChange={e => {
									setStartMonth(e.target.value)
								}}
							>
								{months.map((month, index) => (
									<MenuItem key={month} value={index + 1}>
										{t[month]}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						{/* Год */}
						<FormControl fullWidth>
							<InputLabel>{t.start_year}</InputLabel>
							<Select
								value={startYear}
								label={t.start_year}
								onChange={e => {
									setStartYear(e.target.value)
								}}
							>
								{years.map(year => (
									<MenuItem key={year} value={year}>
										{year}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						{/* Gender */}
						<FormControl fullWidth>
							<InputLabel>{t.status}</InputLabel>
							<Select
								value={status}
								label={t.status}
								onChange={e => {
									setStatus(e.target.value)
								}}
							>
								<MenuItem value='on_vacation'>{t.on_vacation}</MenuItem>
								<MenuItem value='on_sick_leave'>{t.on_sick_leave}</MenuItem>
								<MenuItem value='on_a_business_trip'>
									{t.on_a_business_trip}
								</MenuItem>
							</Select>
						</FormControl>
					</Stack>
					<Stack direction='row' spacing={1}>
						{/* День */}
						<FormControl fullWidth>
							<InputLabel>{t.end_day}</InputLabel>
							<Select
								value={endDay}
								label={t.end_day}
								onChange={e => {
									setEndDay(e.target.value)
								}}
							>
								{days.map(day => (
									<MenuItem key={day} value={day}>
										{day}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						{/* Месяц */}
						<FormControl fullWidth>
							<InputLabel>{t.end_month}</InputLabel>
							<Select
								value={endMonth}
								label={t.end_month}
								onChange={e => {
									setEndMonth(e.target.value)
								}}
							>
								{months.map((month, index) => (
									<MenuItem key={month} value={index + 1}>
										{t[month]}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						{/* Год */}
						<FormControl fullWidth>
							<InputLabel>{t.end_year}</InputLabel>
							<Select
								value={endYear}
								label={t.end_year}
								onChange={e => {
									setEndYear(e.target.value)
								}}
							>
								{years.map(year => (
									<MenuItem key={year} value={year}>
										{year}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						{/* buttons */}
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'end',
								gap: 2,
								width: '100%',
							}}
						>
							<Button
								onClick={async () => {
									if (canSave) {
										await createStatus({
											token,
											id,
											startDay: startDay!,
											startMonth: startMonth!,
											startYear: startYear!,
											endDay: endDay!,
											endMonth: endMonth!,
											endYear: endYear!,
											status,
										})
										close()
									}
								}}
								fullWidth
								variant={canSave ? 'contained' : 'outlined'}
							>
								{t.add}
							</Button>
						</Box>
					</Stack>
				</Box>
				<Line />
				{/* history */}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						maxHeight: '300px',
						overflowY: 'auto',
						p: 1,
					}}
				>
					{EmployeeStatus?.map((sts, index) => {
						return (
							<Box
								key={index}
								sx={{
									display: 'grid',
									gridTemplateColumns: '1fr 1fr 1fr',
									width: '100%',
									gap: 2,
								}}
							>
								<Typography
									variant='h5'
									sx={{ color: theme.palette.primary.main }}
								>
									{t[sts.status]}
								</Typography>
								<ReadOnlyTexField
									label={t.start_time}
									textField={`${sts.startDay
										.toString()
										.padStart(2, '0')}.${sts.startMonth
										.toString()
										.padStart(2, '0')}.${sts.startYear}`}
								/>
								<ReadOnlyTexField
									label={t.end_time}
									textField={`${sts.startDay
										.toString()
										.padStart(2, '0')}.${sts.startMonth
										.toString()
										.padStart(2, '0')}.${sts.startYear}`}
								/>
							</Box>
						)
					})}
				</Box>
			</Box>
		</Modal>
	)
}

export default ChangeStatus
