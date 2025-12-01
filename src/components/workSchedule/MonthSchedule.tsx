import type { Dayjs } from 'dayjs'
import { useTranslationStore } from '../../language/useTranslationStore'
import type { IWorkScheduleForDay } from '../../types/workSchedule/workSchedule'
import { useState } from 'react'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import NumberField from '../fields/NumberField'
import { formatTime } from '../../functions/exports'
import { useEmployeesSchedule } from '../../store/modal/useEmployeesSchedule'
import { updateWorkSchedule } from '../../api/workSchedule/workSchedule'
import { useTokenStore } from '../../store/token/useTokenStore'

const MonthSchedule = ({
	startDate,
	endDate,
}: {
	startDate: Dayjs
	endDate: Dayjs
}) => {
	const { token } = useTokenStore()
	const { selectedEmployees, closeModal } = useEmployeesSchedule()
	const { t } = useTranslationStore()
	const initialSchedule: IWorkScheduleForDay[] = Array.from(
		{ length: 31 },
		(_, i) => ({
			id: (i + 1).toString(),
			startHour: 99,
			endHour: 99,
			startDay: i + 1,
			startMonth: 1,
			startYear: 2025,
			endDay: i + 1,
			endMonth: 1,
			endYear: 2025,
		})
	)
	const [startHourInput, setStartHourInput] = useState<string>('')
	const [schedule, setSchedule] =
		useState<IWorkScheduleForDay[]>(initialSchedule)
	const [selectedDays, setSelectedDays] = useState<string[]>([])
	const handleStartHourChange = (newStartHour: number) => {
		setSchedule(prev =>
			prev.map(day => {
				if (!selectedDays.includes(day.id)) return day

				return {
					...day,
					startHour: newStartHour,
					endHour:
						newStartHour !== 99
							? newStartHour + (day.endHour - day.startHour)
							: 99,
				}
			})
		)
	}

	const handleWorkingHoursChange = (workHours: number) => {
		setSchedule(prev =>
			prev.map(day => {
				if (!selectedDays.includes(day.id)) return day

				// Если выходной (99), не меняем
				if (day.startHour === 99) {
					return { ...day }
				}

				return {
					...day,
					endHour: day.startHour + workHours,
				}
			})
		)
	}
	const createMonthSchedule = async () => {
		if (!startDate || !endDate || selectedEmployees.length === 0) return
		const schedulesToCreate: IWorkScheduleForDay[] = []
		for (const employee of selectedEmployees) {
			let current = startDate.startOf('day')
			while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
				const date = current.date()
				const month = current.month() + 1
				const year = current.year()
				const template = schedule.find(d => Number(d.id) === date)
				if (template) {
					const workDay: IWorkScheduleForDay = {
						id: employee.id,
						startHour: template.startHour,
						endHour: template.endHour,
						startDay: date,
						startMonth: month,
						startYear: year,
						endDay: date,
						endMonth: month,
						endYear: year,
					}
					schedulesToCreate.push(workDay)
				}
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
					onWheel={e => e.currentTarget.blur()}
					onChange={e => {
						handleStartHourChange(Number(e.target.value))
						setStartHourInput(e.target.value)
					}}
					size='small'
					value={startHourInput}
					label={t.work_start_time}
					sx={{ width: 160 }}
				>
					{Array.from({ length: 18 }, (_, i) => i + 6).map(h => (
						<MenuItem key={h} value={h}>
							{String(h).padStart(2, '0')}:00
						</MenuItem>
					))}
				</TextField>
				<NumberField
					onWheel={e => e.currentTarget.blur()}
					onValueChange={value => {
						handleWorkingHoursChange(value || 0)
					}}
					size='small'
					label={t.working_hours}
					min={1}
					max={24}
				/>
				<Button
					variant={selectedDays.length > 0 ? 'contained' : 'outlined'}
					onClick={() => {
						setSelectedDays([])
					}}
				>
					{t.select_again}
				</Button>
				<Button variant='contained' onClick={createMonthSchedule}>
					{t.save}
				</Button>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(5, 1fr)',
						width: '100%',
					}}
				>
					{schedule.map((day, ind) => {
						return (
							<Box
								key={ind}
								sx={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									height: '50px',
									border: '1px solid black',
									bgcolor: selectedDays.includes(day.id) ? 'red' : '',
								}}
								onClick={() => {
									setSelectedDays(prev => {
										if (prev.includes(day.id)) {
											return prev.filter(d => d !== day.id)
										}
										return [...prev, day.id]
									})
								}}
							>
								<Typography variant='body1' fontWeight='medium'>
									{day.id}
								</Typography>
								<Typography>
									{formatTime(day) == null ? t.weekend : formatTime(day)}
								</Typography>
							</Box>
						)
					})}
				</Box>
			</Box>
		</>
	)
}

export default MonthSchedule
