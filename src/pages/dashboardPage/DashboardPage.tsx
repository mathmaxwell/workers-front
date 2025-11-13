import { Box } from '@mui/material'

import DashboardPageMain from '../../components/DashboardPage/DashboardPageMain'
import DashboardPageCards from '../../components/DashboardPage/DashboardPageCards'
import DashboardFooter from '../../components/DashboardFooter/DashboardFooter'

import { useQuery } from '@tanstack/react-query'
import type { IEmployeesCount } from '../../types/employees/employeesType'
import { useTokenStore } from '../../store/token/useTokenStore'
import Loading from '../../components/Loading/Loading'
import { employeesCount } from '../../api/employeesInfo/employeesInfo'

const DashboardPage = () => {
	const { token } = useTokenStore()
	const { data: employeesCountInfo } = useQuery<IEmployeesCount, Error>({
		queryKey: ['employeesCount', token],
		queryFn: async () => {
			const now = new Date()
			const day = now.getDate()
			const month = now.getMonth() + 1
			const year = now.getFullYear()
			const result = await employeesCount({ token, day, month, year })
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
					gap: '20px',
					justifyContent: 'start',
					alignItems: 'start',
				}}
			>
				{employeesCountInfo === undefined ? (
					<Loading />
				) : (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '20px',
							overflowY: 'auto',
							width: 'calc(100vw - 310px)',
						}}
					>
						<DashboardPageCards
							count={employeesCountInfo.active_employees}
							name='active_employees'
						/>
						<DashboardPageCards
							count={employeesCountInfo.absence}
							name='absence'
						/>
						<DashboardPageCards
							count={employeesCountInfo.on_a_business_trip}
							name='on_a_business_trip'
						/>
						<DashboardPageCards
							count={employeesCountInfo.on_sick_leave}
							name='on_sick_leave'
						/>
						<DashboardPageCards
							count={employeesCountInfo.on_vacation}
							name='on_vacation'
						/>
						<DashboardPageCards
							count={employeesCountInfo.total_employees}
							name='total_employees'
						/>
					</Box>
				)}
				<DashboardPageMain />
				<DashboardFooter />
			</Box>
		</>
	)
}

export default DashboardPage
