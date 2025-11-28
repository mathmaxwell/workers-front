import { Box, useTheme } from '@mui/material'
import SiteBar from '../../components/SiteBar'

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
						flexDirection: 'column',
						gap: '20px',
					}}
				>
					schedules
				</Box>
			</Box>
		</>
	)
}

export default Schedules
