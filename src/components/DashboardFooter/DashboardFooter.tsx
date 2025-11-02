import { Box, Typography, useTheme } from '@mui/material'
import { useTranslationStore } from '../../language/useTranslationStore'
import BirthdayList from '../List/BirthdayList'
import LateList from '../List/LateList'

const DashboardFooter = () => {
	const { t } = useTranslationStore()
	const theme = useTheme()
	return (
		<>
			<Box
				sx={{
					width: '100%',
					height: '31vh',
					display: 'flex',
					justifyContent: 'center',
					gap: '20px',
				}}
			>
				<Box
					sx={{
						width: '50%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'start',
						alignItems: 'center',
						border: '1px solid',
						borderColor: theme.palette.primary.main,
						borderRadius: 2,
						bgcolor: theme.palette.background.paper,
						padding: '10px',
					}}
				>
					<Typography sx={{ color: theme.palette.primary.main }} variant='h4'>
						{t.list_of_late_arrivals_today}
					</Typography>
					<LateList />
				</Box>
				<Box
					sx={{
						width: '50%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'start',
						alignItems: 'center',
						border: '1px solid',
						borderColor: theme.palette.primary.main,
						borderRadius: 2,
						bgcolor: theme.palette.background.paper,
						padding: '10px',
					}}
				>
					<Typography sx={{ color: theme.palette.primary.main }} variant='h4'>
						{t.birthdays_this_month}
					</Typography>
					<BirthdayList />
				</Box>
			</Box>
		</>
	)
}

export default DashboardFooter
