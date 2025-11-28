import { useQuery } from '@tanstack/react-query'
import { useTokenStore } from '../../store/token/useTokenStore'
import { useNavigate } from 'react-router-dom'
import type {
	IWorkSchedule,
	IWorkScheduleForDay,
} from '../../types/workSchedule/workSchedule'
import { getEmployeeWorkScheduleForMonth } from '../../api/workSchedule/workSchedule'
import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { useTranslationStore } from '../../language/useTranslationStore'
import { useState } from 'react'
import { monthNames } from '../../types/time/time'
import Loading from '../Loading/Loading'
import { useWorkScheduleModalStore } from '../../store/modal/useWorkScheduleState'
import type { IStatus } from '../../types/filterType'
import { getStatusById } from '../../api/employeesInfo/employeesInfo'

const ShowWorkSchedule = ({ id }: { id: string }) => {
	const { t } = useTranslationStore()
	const { token } = useTokenStore()
	const navigate = useNavigate()
	const {
		setSchedule,
		schedule: modal,
		openModal,
	} = useWorkScheduleModalStore()
	const selectedDays = modal.schedule

	const [startMonthSchedule, setStartMonthSchedule] = useState<number>(
		new Date().getMonth()
	) //[0, 11]

	const [startYearSchedule, setStartYearSchedule] = useState<number>(
		new Date().getFullYear()
	)
	const { data: EmployeeWorkSchedule, isLoading } = useQuery<
		IWorkSchedule,
		Error
	>({
		queryKey: [
			'EmployeeWorkSchedule',
			token,
			id,
			startMonthSchedule,
			modal.isOpen,
		],
		queryFn: async () => {
			if (!id) {
				navigate('/base')
				throw new Error('No id provided')
			}
			const result = await getEmployeeWorkScheduleForMonth({
				token,
				id,
				startMonthSchedule: startMonthSchedule + 1,
				startYearSchedule,
			})
			return result
		},
		enabled: !!token && !!id,
	})
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
	if (isLoading) {
		return <Loading />
	}
	return (
		<>
			<Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						width: '100%',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 2,
							width: '230px',
						}}
					>
						<Button
							onClick={() => {
								if (startMonthSchedule === 0) {
									setStartMonthSchedule(11)
									setStartYearSchedule(prev => prev - 1)
								} else {
									setStartMonthSchedule(prev => prev - 1)
								}
							}}
						>
							{t.back}
						</Button>
						<Typography>{t[monthNames[startMonthSchedule]]}</Typography>
						<Button
							onClick={() => {
								if (startMonthSchedule === 11) {
									setStartMonthSchedule(0)
									setStartYearSchedule(prev => prev + 1)
								} else {
									setStartMonthSchedule(prev => prev + 1)
								}
							}}
						>
							{t.forward}
						</Button>
					</Box>

					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Button
							onClick={() => {
								openModal()
							}}
							variant='outlined'
						>
							{t.edit}
						</Button>
					</Box>
				</Box>
				<TableContainer component={Paper} sx={{ height: '51vh' }}>
					<Table sx={{ minWidth: 650 }} aria-label='calendar table'>
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
							{(() => {
								const year = startYearSchedule
								const month = startMonthSchedule //[0, 11]
								const date = new Date(year, month, 1)

								const daysInMonth = new Date(year, month + 1, 0).getDate()

								const weeks: (number | null)[][] = []
								let week: (number | null)[] = new Array(7).fill(null)
								const jsDay = (date.getDay() + 6) % 7
								for (let i = 0; i < jsDay; i++) week[i] = null
								for (let day = 1; day <= daysInMonth; day++) {
									const d = new Date(year, month, day)
									const weekday = (d.getDay() + 6) % 7
									week[weekday] = day
									if (weekday === 6) {
										weeks.push(week)
										week = new Array(7).fill(null)
									}
								}
								if (week.some(x => x !== null)) weeks.push(week)

								return weeks.map((week, wIndex) => (
									<TableRow key={wIndex}>
										{week.map((day, dIndex) => {
											if (day === null)
												return <TableCell key={dIndex}></TableCell>
											const work = EmployeeWorkSchedule?.workSchedule.find(
												ws => {
													return (
														ws.startDay === day &&
														ws.startMonth === startMonthSchedule + 1 &&
														ws.startYear === startYearSchedule
													)
												}
											)
											const current = new Date(
												startYearSchedule,
												startMonthSchedule + 1,
												day
											)
											const status = EmployeeStatus?.find(s => {
												const start = new Date(
													s.startYear,
													s.startMonth,
													s.startDay
												)
												const end = new Date(s.endYear, s.endMonth, s.endDay)
												return start <= current && current <= end
											})

											return (
												<TableCell
													key={dIndex}
													sx={{
														bgcolor: selectedDays.some(
															s =>
																s.startDay === day &&
																s.startMonth === startMonthSchedule + 1 &&
																s.startYear === startYearSchedule
														)
															? 'green'
															: status?.status == 'on_a_business_trip'
															? 'error.main'
															: status?.status === 'on_sick_leave'
															? 'error.main'
															: status?.status === 'on_vacation'
															? 'error.main'
															: '',
													}}
													onClick={() => {
														if (!status?.status.length) {
															let item: IWorkScheduleForDay
															if (work !== undefined) {
																item = work
															} else {
																item = {
																	id: '',
																	startHour: 0,
																	startDay: day!,
																	startMonth: startMonthSchedule + 1,
																	startYear: startYearSchedule,
																	endHour: 0,
																	endDay: day!,
																	endMonth: startMonthSchedule + 1,
																	endYear: startYearSchedule,
																}
															}
															const current = modal.schedule
															const isSelected = current.some(
																s =>
																	s.startDay === item.startDay &&
																	s.startMonth === item.startMonth &&
																	s.startYear === item.startYear
															)

															let newSchedule: IWorkScheduleForDay[]
															if (isSelected) {
																newSchedule = current.filter(
																	s =>
																		!(
																			s.startDay === item.startDay &&
																			s.startMonth === item.startMonth &&
																			s.startYear === item.startYear
																		)
																)
															} else {
																newSchedule = [...current, item]
															}
															setSchedule({ schedule: newSchedule })
														}
													}}
												>
													<strong>{day}</strong>
													<br />
													{work
														? `${work.startHour}:00 - ${work.endHour}:00`
														: status?.status === 'on_a_business_trip'
														? t.on_a_business_trip
														: status?.status === 'on_sick_leave'
														? t.on_sick_leave
														: status?.status == 'on_vacation'
														? t.on_vacation
														: t.weekend}
												</TableCell>
											)
										})}
									</TableRow>
								))
							})()}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	)
}

export default ShowWorkSchedule
