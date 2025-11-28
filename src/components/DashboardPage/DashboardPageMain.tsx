import { Box, useTheme } from '@mui/material'
import DashboardShowTotal from './DashboardShowTotal'
import DashboardSelectDate from './DashboardSelectDate'
import DashboardPageAverageCards from './DashboardPageAverageCards'
import DashboardPageChard from './DashboardPageChard'
import { useDateRangeStore } from '../../store/useDateStore'
import {
	getLateStatsArray,
	getLostTime,
	getMonthRange,
} from '../../functions/dataFn'
import DashboardPageShowSelectedDate from './DashboardPageShowSelectedDate'

import { useQuery } from '@tanstack/react-query'
import { useTokenStore } from '../../store/token/useTokenStore'
import { getLateEmployees } from '../../api/employeesInfo/employeesInfo'
import { useMemo } from 'react'
import type { ITardinessHistory } from '../../types/workSchedule/workSchedule'
import { useEmployeesStore } from '../../store/modal/useEmployeesModal'
import { useTranslationStore } from '../../language/useTranslationStore'

const DashboardPageMain = () => {
	const theme = useTheme()
	const { t } = useTranslationStore()
	const { token } = useTokenStore()
	const { startDate, endDate } = useDateRangeStore()
	const { start: monthStart, end: monthEnd } = getMonthRange(startDate)
	const isWholeMonthSelected =
		startDate.getTime() === monthStart.getTime() &&
		endDate.getTime() === monthEnd.getTime()

	const { open, setIds, setText } = useEmployeesStore()

	const { data: employees } = useQuery<ITardinessHistory[], Error>({
		queryKey: ['EmployeesLate', token, startDate, endDate],
		queryFn: async () => {
			const result = await getLateEmployees({
				token,
				startDate: startDate,
				endDate: endDate,
			})
			return result || []
		},
		enabled: !!token,
	})

	const totalLateTime =
		employees?.reduce((sum, info) => {
			return (
				sum + (getLostTime(info).color === 'red' ? -getLostTime(info).diff : 0)
			)
		}, 0) ?? 0
	const informationArray = useMemo(() => {
		if (!employees) return []
		return getLateStatsArray(employees, startDate, endDate)
	}, [employees, startDate, endDate])

	return (
		<Box
			sx={{
				bgcolor: theme.palette.background.paper,
				width: '100%',
				height: '45vh',
				borderRadius: 2,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: '10px',
				border: '1px solid',
				borderColor: theme.palette.primary.main,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<DashboardShowTotal count={employees?.length || 0} />
				<DashboardPageShowSelectedDate />
				<DashboardSelectDate />
			</Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<DashboardPageChard
					informationArray={informationArray}
					month={isWholeMonthSelected ? startDate.getMonth() : undefined}
					onBarClick={async (dataStr: string) => {
						if (employees !== undefined) {
							setIds(
								employees.map(ids => {
									const diff = getLostTime(ids).diff
									return {
										id: ids.id,
										description: `${t.late_time}: ${-diff} ${t.minute} `,
									}
								})
							)
						}
						setText(dataStr)
						open()
					}}
				/>
				<DashboardPageAverageCards totalTime={totalLateTime} />
			</Box>
		</Box>
	)
}

export default DashboardPageMain
