import { Box, Button, Typography, useTheme } from '@mui/material'
import { useTranslationStore } from '../../language/useTranslationStore'

const DashboardPageAverageCards = ({ totalTime }: { totalTime: number }) => {
	const theme = useTheme()
	const { t } = useTranslationStore()
	const AverageHours = Math.floor(totalTime / 60)
	const AverageMinutes = Math.floor(totalTime % 60)
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					alignItems: 'end',
					gap: 2,
				}}
			>
				<Button
					sx={{
						padding: '10px',
						width: '300px',
						height: '120px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						alignItems: 'start',
						border: '1px solid',
						borderColor: theme.palette.primary.main,
						boxShadow: `0px 0px 10px ${theme.palette.primary.main}`,
					}}
				>
					<Typography sx={{ textAlign: 'left' }}>
						{t.time_lost_for_the_period}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'end',
							justifyContent: 'start',
						}}
					>
						<Typography variant='h4'>{AverageHours}</Typography>
						{t.hour}{' '}
						<Typography sx={{ marginLeft: 1 }} variant='h4'>
							{AverageMinutes}
						</Typography>
						{t.minute}
					</Box>
				</Button>
			</Box>
		</>
	)
}

export default DashboardPageAverageCards
