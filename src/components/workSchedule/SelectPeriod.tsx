import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useTranslationStore } from '../../language/useTranslationStore'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
const SelectPeriod = ({
	startDate,
	endDate,
	setStartDate,
	setEndDate,
}: {
	startDate: Dayjs
	endDate: Dayjs
	setStartDate: React.Dispatch<React.SetStateAction<Dayjs>>
	setEndDate: React.Dispatch<React.SetStateAction<Dayjs>>
}) => {
	const { t } = useTranslationStore()
	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer components={['DatePicker', 'DatePicker']}>
					<DatePicker
						label={t.start_date}
						openTo='month'
						views={['year', 'month', 'day']}
						value={startDate}
						minDate={dayjs(new Date())}
						sx={{ maxWidth: '30px' }}
						maxDate={endDate}
						format='DD/MM/YYYY'
						onChange={e => {
							e != null && setStartDate(e)
						}}
					/>
					<DatePicker
						label={t.end_date}
						minDate={startDate}
						openTo='month'
						format='DD/MM/YYYY'
						views={['year', 'month', 'day']}
						value={endDate}
						sx={{ maxWidth: '30px' }}
						onChange={e => {
							e != null && setEndDate(e)
						}}
					/>
				</DemoContainer>
			</LocalizationProvider>
		</>
	)
}

export default SelectPeriod
