import { useQuery } from '@tanstack/react-query'
import type { ITardinessHistory } from '../../types/workSchedule/workSchedule'
import { useTokenStore } from '../../store/token/useTokenStore'
import { getLateEmployeesById } from '../../api/employeesInfo/employeesInfo'
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
import { useState } from 'react'
import { useTranslationStore } from '../../language/useTranslationStore'
import { monthNames } from '../../types/time/time'
import { getLostTime } from '../../functions/dataFn'

const ShowTardinessHistory = ({ id }: { id: string }) => {
	const { token } = useTokenStore()
	const { t } = useTranslationStore()
	const [startMonthSchedule, setStartMonthSchedule] = useState<number>(
		new Date().getMonth()
	)
	const [startYearSchedule, setStartYearSchedule] = useState<number>(
		new Date().getFullYear()
	)
	const { data: lateEmployeesById } = useQuery<ITardinessHistory[], Error>({
		queryKey: ['getLateEmployeesById', token, id, startMonthSchedule],
		queryFn: async () => {
			const result = await getLateEmployeesById({
				token,
				id,
				startMonth: startMonthSchedule + 1,
				startYear: startYearSchedule,
				endMonth: startMonthSchedule + 1,
				endYear: startYearSchedule,
			})
			return result || []
		},
		enabled: !!token,
	})
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'start',
					justifyContent: 'center',
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
				<TableContainer component={Paper} sx={{ height: '51vh' }}>
					<Table sx={{ minWidth: 650 }} aria-label='calendar table'>
						<TableHead>
							<TableRow>
								<TableCell>{t.number}</TableCell>
								<TableCell>{t.work_start_time}</TableCell>
								<TableCell>{t.arrival_time}</TableCell>
								<TableCell>{t.work_end_time}</TableCell>
								<TableCell>{t.departure_time}</TableCell>
								<TableCell>{t.time_lost}</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{lateEmployeesById?.map((late, ind) => {
								return (
									<TableRow key={ind}>
										<TableCell>{`${late.day.toString().padStart(2, '0')}.${(
											startMonthSchedule + 1
										)
											.toString()
											.padStart(2, '0')}.${startYearSchedule}`}</TableCell>
										<TableCell>
											{`${late.workSchedule.startHour
												.toString()
												.padStart(2, '0')}:00`}
										</TableCell>
										<TableCell>{`${late.entryHour
											.toString()
											.padStart(2, '0')}:${late.entryMinute
											.toString()
											.padStart(2, '0')}`}</TableCell>
										<TableCell>
											{`${late.workSchedule.endHour
												.toString()
												.padStart(2, '0')}:00`}
										</TableCell>
										<TableCell>{`${late.exitHour
											.toString()
											.padStart(2, '0')}:${late.exitMinute
											.toString()
											.padStart(2, '0')}`}</TableCell>
										<TableCell>
											{(() => {
												const { color, diff } = getLostTime(late)
												return <span style={{ color }}>{diff}</span>
											})()}
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	)
}

export default ShowTardinessHistory
