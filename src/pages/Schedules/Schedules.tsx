import { Box, useTheme } from '@mui/material'
import SiteBar from '../../components/SiteBar'
import SelectDepartament from './SelectDepartament'
import EmployeesInDeportament from './EmployeesInDeportament'

const Schedules = () => {
	const theme = useTheme()
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
						alignItems: 'center',
						justifyContent: 'center',
						gap: '20px',
						height: '100%',
					}}
				>
					<SelectDepartament />
					<EmployeesInDeportament />
				</Box>
			</Box>
		</>
	)
}

export default Schedules
