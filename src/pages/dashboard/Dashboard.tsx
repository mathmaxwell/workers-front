import { Box, useTheme } from '@mui/material'
import SiteBar from '../../components/SiteBar'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardPage from '../dashboardPage/DashboardPage'
import BasePage from '../BasePage/BasePage'
import { useTokenStore } from '../../store/token/useTokenStore'
import { useEffect } from 'react'

const Dashboard = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const theme = useTheme()
	const { token } = useTokenStore()
	useEffect(() => {
		if (!token) {
			navigate('/register')
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
				{id == 'base' ? <BasePage /> : <DashboardPage />}
			</Box>
		</>
	)
}

export default Dashboard
