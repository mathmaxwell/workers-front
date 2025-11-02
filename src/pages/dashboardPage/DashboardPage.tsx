import { Box } from '@mui/material'

import DashboardPageMain from '../../components/DashboardPage/DashboardPageMain'
import DashboardPageCards from '../../components/DashboardPage/DashboardPageCards'
import DashboardFooter from '../../components/DashboardFooter/DashboardFooter'
import { employeesCount } from '../../api/employeesInfo/employeesInfo'
import { useQuery } from '@tanstack/react-query'
import type { IEmployeesCount } from '../../types/employees/employeesType'
import { useTokenStore } from '../../store/token/useTokenStore'

const DashboardPage = () => {
	const { token } = useTokenStore()
	const { data: employeesCountInfo } = useQuery<IEmployeesCount, Error>({
		queryKey: ['employeesCountInfo', token],
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
						count={employeesCountInfo?.active_employees || 0}
						name='active_employees'
					/>
					<DashboardPageCards
						count={employeesCountInfo?.absence || 0}
						name='absence'
					/>
					<DashboardPageCards
						count={employeesCountInfo?.on_a_business_trip || 0}
						name='on_a_business_trip'
					/>
					<DashboardPageCards
						count={employeesCountInfo?.on_sick_leave || 0}
						name='on_sick_leave'
					/>
					<DashboardPageCards
						count={employeesCountInfo?.on_vacation || 0}
						name='on_vacation'
					/>
					<DashboardPageCards
						count={employeesCountInfo?.total_employees || 0}
						name='total_employees'
					/>
				</Box>
				<DashboardPageMain />
				<DashboardFooter />
			</Box>
		</>
	)
}

export default DashboardPage
