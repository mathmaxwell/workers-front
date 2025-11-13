import { useQuery } from '@tanstack/react-query'
import { useTokenStore } from '../../store/token/useTokenStore'
import { useNavigate } from 'react-router-dom'
import type { IWorkSchedule } from '../../types/workSchedule/workSchedule'
import { getEmployeeWorkSchedule } from '../../api/workSchedule/workSchedule'
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

const ShowWorkSchedule = ({ id }: { id: string }) => {
	const { t } = useTranslationStore()
	const { token } = useTokenStore()
	const navigate = useNavigate()
	const [startMonthSchedule, setStartMonthSchedule] = useState<number>(
		new Date().getMonth()
	)
	const [startYearSchedule, setStartYearSchedule] = useState<number>(
		new Date().getFullYear()
	)
	const { data: EmployeeWorkSchedule } = useQuery<IWorkSchedule[], Error>({
		queryKey: [
			'EmployeeWorkSchedule',
			token,
			id,
			startMonthSchedule,
			startYearSchedule,
		],
		queryFn: async () => {
			if (!id) {
				navigate('/base')
				throw new Error('No id provided')
			}
			const result = await getEmployeeWorkSchedule({
				token,
				id,
				startMonthSchedule,
				startYearSchedule,
			})
			return result
		},
		enabled: !!token && !!id,
	})
	console.log('EmployeeWorkSchedule', EmployeeWorkSchedule)

	return (
		<>
			{EmployeeWorkSchedule?.map((schedule, index) => {
				return (
					<Box key={index}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								width: '100%',
							}}
						>
							<Typography>
								{schedule.startDay}.{schedule.startMonth + 1}.
								{schedule.startYear} -{schedule.endDay}.{schedule.endMonth + 1}.
								{schedule.endYear}
							</Typography>
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
										if (startMonthSchedule == 0) {
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
										if (startMonthSchedule == 11) {
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
										const month = startMonthSchedule - 1

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
													const work = schedule.workSchedule.find(ws => {
														return (
															ws.startDay === day &&
															ws.startMonth === startMonthSchedule &&
															ws.startYear === startYearSchedule
														)
													})

													return (
														<TableCell key={dIndex}>
															<strong>{day}</strong>
															<br />
															{work
																? `${work.startHour}:00 - ${work.endHour}:00`
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
				)
			})}
		</>
	)
}

export default ShowWorkSchedule
