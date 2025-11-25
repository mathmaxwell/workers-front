import {
	Box,
	Button,
	MenuItem,
	Modal,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import { useWorkScheduleModalStore } from '../../store/modal/useWorkScheduleState'
import { useTranslationStore } from '../../language/useTranslationStore'
import { updateWorkSchedule } from '../../api/workSchedule/workSchedule'
import { useTokenStore } from '../../store/token/useTokenStore'
import { useState } from 'react'
import NumberField from '../fields/NumberField'
const CreateWorkScheduleModal = () => {
	const theme = useTheme()
	const { schedule, closeModal, setSchedule } = useWorkScheduleModalStore()
	const { t } = useTranslationStore()
	const { token } = useTokenStore()
	const hours = Array.from({ length: 24 }, (_, i) => i)
	const [startWorkHour, setStartWorkHour] = useState<number>(9)
	const [workHour, setWorkHour] = useState<number | null>(9)
	return (
		<>
			<Modal
				open={schedule.isOpen}
				onClose={() => {
					closeModal()
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 800,
						bgcolor: theme.palette.background.default,
						boxShadow: 24,
						borderRadius: 2,
						p: 3,
						border: '2px solid',
						borderColor: theme.palette.primary.main,
					}}
				>
					<Typography
						variant='h5'
						sx={{ color: theme.palette.text.primary, mb: 2 }}
					>
						{t.work_schedule}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'start',
							gap: 2,
						}}
					>
						<TextField
							select
							size='small'
							label={t.work_start_time}
							sx={{ width: '200px' }}
							value={startWorkHour}
							onChange={e => setStartWorkHour(Number(e.target.value))}
						>
							{hours.map(h => (
								<MenuItem key={h} value={h}>
									{String(h).padStart(2, '0')}:00
								</MenuItem>
							))}
						</TextField>
						<NumberField
							value={workHour}
							onValueChange={e => {
								setWorkHour(e)
							}}
							size='small'
							label={t.working_hours}
							min={1}
							max={24}
						/>
						<Button
							onClick={() => {
								setSchedule({
									schedule: schedule.schedule.map(item => ({
										...item,
										startHour: 99,
										endHour: 99,
									})),
								})
							}}
							sx={{ ml: 'auto' }}
							variant='outlined'
						>
							{t.weekend}
						</Button>
					</Box>
					<Box
						sx={{
							maxHeight: '500px',
							overflowY: 'auto',
							display: 'grid',
							gridTemplateColumns: 'repeat(6, 1fr)',
							gap: 1,
						}}
					>
						{schedule.schedule.map((sch, ind) => {
							return (
								<Box
									sx={{
										color: 'black',
										border: '1px solid',
										borderColor: theme.palette.primary.main,
										p: 1,
										borderRadius: 2,
										mt: 2,
										mb: 2,
										display: 'flex',
										flexDirection: 'column',
										overflowY: 'auto',
									}}
									key={ind}
								>
									<Typography>
										{`${sch.startDay
											.toString()
											.padStart(2, '0')}.${sch.startMonth
											.toString()
											.padStart(2, '0')}.${sch.startYear}`}
									</Typography>
									<Typography>
										{sch.endHour != 99 && sch.startHour != 99
											? `${sch.startHour}:00 - ${sch.endHour}:00`
											: t.weekend}
									</Typography>
								</Box>
							)
						})}
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'end',
							justifyContent: 'end',
							gap: 2,
						}}
					>
						<Button variant='outlined' color='error'>
							{t.back}
						</Button>
						<Button
							onClick={async () => {
								await Promise.all(
									schedule.schedule.map(sch =>
										updateWorkSchedule({
											token,
											workSchedule: sch,
										})
									)
								)
								closeModal()
							}}
							variant='contained'
						>
							{t.save}
						</Button>
					</Box>
				</Box>
			</Modal>
		</>
	)
}

export default CreateWorkScheduleModal
