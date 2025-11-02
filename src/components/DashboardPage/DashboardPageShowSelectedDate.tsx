import { Box, Button, Typography } from '@mui/material'
import {
	getMonthRange,
	getNextMonthRange,
	getNextWeekRange,
	getPrevMonthRange,
	getPrevWeekRange,
} from '../../functions/dataFn'
import { useDateRangeStore } from '../../store/useDateStore'
import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'

const DashboardPageShowSelectedDate = () => {
	const { startDate, endDate, setStartDate, setEndDate } = useDateRangeStore()

	const { start: monthStart, end: monthEnd } = getMonthRange(startDate)
	const isWholeMonthSelected =
		startDate.getTime() === monthStart.getTime() &&
		endDate.getTime() === monthEnd.getTime()
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '10px',
				}}
			>
				<Button
					onClick={() => {
						if (isWholeMonthSelected) {
							const { start, end } = getPrevMonthRange(startDate)
							setStartDate(start)
							setEndDate(end)
						} else {
							const { start, end } = getPrevWeekRange(startDate)
							setStartDate(start)
							setEndDate(end)
						}
					}}
				>
					<UndoIcon />
				</Button>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Typography>{startDate.toISOString().slice(0, 10)}</Typography>
					<Typography>{endDate.toISOString().slice(0, 10)}</Typography>
				</Box>
				<Button
					onClick={() => {
						if (isWholeMonthSelected) {
							const { start, end } = getNextMonthRange(startDate)
							setStartDate(start)
							setEndDate(end)
						} else {
							const { start, end } = getNextWeekRange(startDate)
							setStartDate(start)
							setEndDate(end)
						}
					}}
				>
					<RedoIcon />
				</Button>
			</Box>
		</>
	)
}

export default DashboardPageShowSelectedDate
