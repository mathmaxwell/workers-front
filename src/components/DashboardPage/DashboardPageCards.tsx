import { Box, Typography, useTheme } from '@mui/material'

import all from '../../assets/images/all.png'
import blue from '../../assets/images/blue.png'
import green from '../../assets/images/green.png'
import grey from '../../assets/images/grey.png'
import red from '../../assets/images/red.png'
import yellow from '../../assets/images/yellow.png'
import { useTranslationStore } from '../../language/useTranslationStore'
const DashboardPageCards = ({
	name,
	count,
}: {
	count: number
	name:
		| 'active_employees'
		| 'on_vacation'
		| 'on_sick_leave'
		| 'on_a_business_trip'
		| 'absence'
		| 'total_employees'
}) => {
	const { t } = useTranslationStore()
	const theme = useTheme()
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: 'start',
					p: '10px',
					bgcolor: theme.palette.background.paper,
					height: '14vh',
					borderRadius: 2,
					width: '200px',
					cursor: 'pointer',
					border: '1px solid',
					borderColor: theme.palette.primary.main,
				}}
			>
				<Typography variant='h6' sx={{ color: theme.palette.primary.main }}>
					{t[name]}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						width: '100%',
					}}
				>
					<Typography variant='h4'>{count}</Typography>
					<img
						style={{ objectFit: 'cover' }}
						src={
							name == 'total_employees'
								? all
								: name == 'on_vacation'
								? red
								: name === 'on_sick_leave'
								? blue
								: name === 'active_employees'
								? green
								: name == 'on_a_business_trip'
								? yellow
								: grey
						}
						alt='image'
					/>
				</Box>
			</Box>
		</>
	)
}

export default DashboardPageCards
