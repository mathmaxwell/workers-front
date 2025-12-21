import {
	Box,
	Button,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import { useState } from 'react'
import NumberField from '../fields/NumberField'
import { useTranslationStore } from '../../language/useTranslationStore'
import type { IWorkScheduleForDay } from '../../types/workSchedule/workSchedule'
import {
	createHoliday,
	defaultSchedule,
	formatTime,
	isHoliday,
	type DayId,
} from '../../functions/exports'
import type { Dayjs } from 'dayjs'
import { useEmployeesSchedule } from '../../store/modal/useEmployeesSchedule'
import { updateWorkSchedule } from '../../api/workSchedule/workSchedule'
import { useTokenStore } from '../../store/token/useTokenStore'
export default function WeekSchedule({
	startDate,
	endDate,
}: {
	startDate: Dayjs
	endDate: Dayjs
}) {
	const { token } = useTokenStore()
	const { t } = useTranslationStore()
	const theme = useTheme()
	const { selectedEmployees, closeModal } = useEmployeesSchedule()
	const [schedule, setSchedule] =
		useState<IWorkScheduleForDay[]>(defaultSchedule)
	const [selectedId, setSelectedId] = useState<DayId | null>(null)
	const selected = selectedId ? schedule.find(s => s.id === selectedId)! : null
	const holiday = selected ? isHoliday(selected) : false
	const toggleHoliday = () => {
		if (!selectedId) return
		setSchedule(prev =>
			prev.map(day =>
				day.id === selectedId
					? isHoliday(day)
						? { ...day, startHour: 9, endHour: 18 }
						: createHoliday(day.id)
					: day
			)
		)
	}
	const updateStartHour = (hour: number) => {
		if (!selectedId) return
		setSchedule(prev =>
			prev.map(day =>
				day.id === selectedId
					? {
							...day,
							startHour: hour,
							endHour: hour + (day.endHour - day.startHour),
					  }
					: day
			)
		)
	}
	const updateHours = (hours: number) => {
		if (!selectedId || !selected || isHoliday(selected)) return
		setSchedule(prev =>
			prev.map(day =>
				day.id === selectedId ? { ...day, endHour: day.startHour + hours } : day
			)
		)
	}
	return (
		<>
			<Box
				sx={{
					my: 2,
					display: 'flex',
					gap: 2,
					alignItems: 'center',
					flexWrap: 'wrap',
				}}
			>
				<TextField
					select
					size='small'
					label={t.work_start_time}
					value={holiday ? '' : selected?.startHour ?? 9}
					disabled={holiday || !selected}
					onChange={e => updateStartHour(Number(e.target.value))}
					sx={{ width: 160 }}
				>
					{Array.from({ length: 18 }, (_, i) => i + 6).map(h => (
						<MenuItem key={h} value={h}>
							{String(h).padStart(2, '0')}:00
						</MenuItem>
					))}
				</TextField>

				<NumberField
					size='small'
					label={t.working_hours}
					value={
						holiday ? 0 : selected ? selected.endHour - selected.startHour : 9
					}
					onValueChange={val => val && updateHours(val)}
					disabled={holiday || !selected}
					min={1}
					max={24}
				/>

				<Button
					variant={holiday ? 'contained' : 'outlined'}
					color={holiday ? 'error' : 'primary'}
					onClick={() => {
						toggleHoliday()
					}}
					disabled={!selected}
				>
					{holiday ? t.work_schedule : t.weekend}
				</Button>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>{t.monday}</TableCell>
								<TableCell>{t.tuesday}</TableCell>
								<TableCell>{t.wednesday}</TableCell>
								<TableCell>{t.thursday}</TableCell>
								<TableCell>{t.friday}</TableCell>
								<TableCell>{t.saturday}</TableCell>
								<TableCell>{t.sunday}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								{schedule.map(day => (
									<TableCell
										key={day.id}
										onClick={() => setSelectedId(day.id as DayId)}
										sx={{
											cursor: 'pointer',
											bgcolor:
												selectedId === day.id
													? `${theme.palette.primary.light}44`
													: 'transparent',
											border:
												selectedId === day.id
													? `2px solid ${theme.palette.primary.main}`
													: '1px solid rgba(0,0,0,0.12)',
											textAlign: 'center',
											fontWeight: selectedId === day.id ? 'bold' : 'normal',
											color: isHoliday(day) ? 'error.main' : 'inherit',
											p: 2,
										}}
									>
										<Typography variant='body1' fontWeight='medium'>
											{formatTime(day) == null ? t.weekend : formatTime(day)}
										</Typography>
									</TableCell>
								))}
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<Button
					variant='contained'
					onClick={async () => {
						if (!startDate || !endDate || selectedEmployees.length === 0) return
						const schedulesToCreate: IWorkScheduleForDay[] = []
						for (const employee of selectedEmployees) {
							let current = startDate.startOf('day')
							while (
								current.isBefore(endDate) ||
								current.isSame(endDate, 'day')
							) {
								const dayOfWeek = current.format('dddd').toLowerCase()
								const date = current.date()
								const month = current.month() + 1
								const year = current.year()
								const template = schedule.find(s => s.id === dayOfWeek)
								if (!template) {
									continue
								}
								const holiday = isHoliday(template)
								const workDay: IWorkScheduleForDay = {
									id: 'create',
									EmployeeId: employee.id,
									startHour: holiday ? 99 : template.startHour,
									endHour: holiday ? 99 : template.endHour,
									startDay: date,
									startMonth: month,
									startYear: year,
									endDay: date,
									endMonth: month,
									endYear: year,
								}
								schedulesToCreate.push(workDay)
								current = current.add(1, 'day')
							}
						}
						try {
							await Promise.all(
								schedulesToCreate.map(schedule =>
									updateWorkSchedule({
										token,
										workSchedule: schedule,
									})
								)
							)
							closeModal()
						} catch (err) {
							console.log('error', err)
						}
					}}
					sx={{ marginLeft: 'auto' }}
				>
					{t.save}
				</Button>
			</Box>
		</>
	)
}
