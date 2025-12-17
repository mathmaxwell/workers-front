import { Box, useTheme } from '@mui/material'
import SiteBar from '../../components/SiteBar'
import { useNavigate } from 'react-router-dom'
import DashboardPage from '../dashboardPage/DashboardPage'
import { useTokenStore } from '../../store/token/useTokenStore'
import { useEffect } from 'react'

const Dashboard = () => {
	const navigate = useNavigate()
	const theme = useTheme()
	const { token, userRole } = useTokenStore()
	useEffect(() => {
		if (!token) {
			navigate('/register')
		}
		if (userRole == '99') {
			navigate(`/employees/${token}`)
		}
	}, [token])
	return (
		<>
			<Box
				sx={{
					position: 'relative',
					height: '100vh',
					width: '100vw',
					p: '20px',
					bgcolor: theme.palette.background.default,
					display: 'flex',
					alignItems: 'start',
					justifyContent: 'start',
					gap: '20px',
				}}
			>
				<SiteBar />
				<DashboardPage />
			</Box>
		</>
	)
}

export default Dashboard
