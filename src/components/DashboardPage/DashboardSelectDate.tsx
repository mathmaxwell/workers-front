import { Box, Button, useTheme } from '@mui/material'
import { useDateRangeStore } from '../../store/useDateStore'
import {
	getCurrentMonthRange,
	getCurrentWeekRange,
} from '../../functions/dataFn'
import { useTranslationStore } from '../../language/useTranslationStore'
const DashboardSelectDate = () => {
	const { t } = useTranslationStore()
	const theme = useTheme()
	const { startDate, endDate, setStartDate, setEndDate } = useDateRangeStore()

	const { start: monthStart, end: monthEnd } = getCurrentMonthRange()
	const isMonthSelected =
		startDate.getTime() === monthStart.getTime() &&
		endDate.getTime() === monthEnd.getTime()
	const { start: weekStart, end: weekEnd } = getCurrentWeekRange()

	const isWeekSelected =
		startDate.getTime() === weekStart.getTime() &&
		endDate.getTime() === weekEnd.getTime()

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'start',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '10px',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						border: '1px solid',
						borderColor: theme.palette.primary.main,
						borderRadius: 2,
					}}
				>
					<Button
						onClick={() => {
							setStartDate(monthStart)
							setEndDate(monthEnd)
						}}
						sx={{
							borderRadius: 2,
							padding: '10px',
							borderRight: isMonthSelected ? '1px solid' : '',
							borderColor: theme.palette.primary.main,
							backgroundColor: isMonthSelected
								? theme.palette.primary.main
								: 'transparent',
							color: isMonthSelected ? 'black' : theme.palette.text.primary,
						}}
					>
						{t.for_the_month}
					</Button>

					<Button
						onClick={() => {
							setStartDate(weekStart)
							setEndDate(weekEnd)
						}}
						sx={{
							borderRadius: 2,
							padding: '10px',
							borderLeft: isWeekSelected ? '1px solid' : '',
							borderColor: theme.palette.primary.main,
							backgroundColor: isWeekSelected
								? theme.palette.primary.main
								: 'transparent',
							color: isWeekSelected ? 'black' : theme.palette.text.primary,
						}}
					>
						{t.for_the_week}
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

export default DashboardSelectDate
