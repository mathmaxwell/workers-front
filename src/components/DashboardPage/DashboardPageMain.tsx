import { Box, useTheme } from '@mui/material'

import DashboardShowTotal from './DashboardShowTotal'
import DashboardSelectDate from './DashboardSelectDate'
import DashboardPageAverageCards from './DashboardPageAverageCards'
import DashboardPageChard from './DashboardPageChard'
import { useDateRangeStore } from '../../store/useDateStore'
import { getLateStatsArray, getMonthRange } from '../../functions/dataFn'
import DashboardPageShowSelectedDate from './DashboardPageShowSelectedDate'
import type { IEmployeesLate } from '../../types/employees/employeesType'
import { useQuery } from '@tanstack/react-query'
import { useTokenStore } from '../../store/token/useTokenStore'
import { getLateEmployees } from '../../api/employeesInfo/employeesInfo'
import { useMemo } from 'react'

const DashboardPageMain = () => {
	const { token } = useTokenStore()
	const { startDate, endDate } = useDateRangeStore()
	const { data: employees } = useQuery<IEmployeesLate[], Error>({
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
		employees?.reduce((sum, info) => sum + info.lateTime, 0) ?? 0

	const informationArray = useMemo(() => {
		if (!employees) return []
		return getLateStatsArray(employees, startDate, endDate)
	}, [employees, startDate, endDate])

	const { start: monthStart, end: monthEnd } = getMonthRange(startDate)
	const isWholeMonthSelected =
		startDate.getTime() === monthStart.getTime() &&
		endDate.getTime() === monthEnd.getTime()
	const theme = useTheme()
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
					month={isWholeMonthSelected ? startDate.getMonth() + 1 : undefined}
					onBarClick={(dataStr: string) => {
						console.log('dataStr', dataStr)
					}}
				/>
				<DashboardPageAverageCards totalTime={totalLateTime} />
			</Box>
		</Box>
	)
}

export default DashboardPageMain
