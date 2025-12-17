import { Box, useTheme } from '@mui/material'
import BaseFilter from '../../components/BasePage/BaseFilter'
import EmployeesList from '../../components/BasePage/EmployeesList'
import SiteBar from '../../components/SiteBar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTokenStore } from '../../store/token/useTokenStore'
const BasePage = () => {
	const theme = useTheme()
	const navigate = useNavigate()
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
				<Box
					sx={{
						width: 'calc(100vw - 310px)',
						display: 'flex',
						flexDirection: 'column',
						gap: '20px',
					}}
				>
					<BaseFilter />
					<EmployeesList />
				</Box>
			</Box>
		</>
	)
}

export default BasePage
