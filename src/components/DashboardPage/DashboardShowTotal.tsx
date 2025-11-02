import { Box, Typography, useTheme } from '@mui/material'
import { useTranslationStore } from '../../language/useTranslationStore'

const DashboardShowTotal = ({ count }: { count: number }) => {
	const { t } = useTranslationStore()
	const theme = useTheme()
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 0.5,
					justifyContent: 'start',
					alignItems: 'start',
				}}
			>
				<Typography sx={{ color: theme.palette.primary.main }} variant='h4'>
					{t.tardiness_monitoring}
				</Typography>
				<Typography variant='h6'>
					{t.number_of_late_arrivals}: {count}
				</Typography>
			</Box>
		</>
	)
}

export default DashboardShowTotal
