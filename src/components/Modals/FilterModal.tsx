import {
	Box,
	Modal,
	Typography,
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Stack,
	useTheme,
} from '@mui/material'
import { useFilterModalStore } from '../../store/modal/useFilterModalStore'
import { useTranslationStore } from '../../language/useTranslationStore'
import { months } from '../../types/filterType'
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 70 }, (_, i) => currentYear - i)
export const FilterModal = () => {
	const theme = useTheme()
	const { t } = useTranslationStore()
	const { filter, setFilter, resetFilter, closeModal } = useFilterModalStore()
	const handleChange = (key: keyof typeof filter, value: string | number) =>
		setFilter({ [key]: value })

	const handleApply = () => {
		closeModal()
	}

	return (
		<Modal open={filter.isOpen} onClose={closeModal}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 700,
					bgcolor: theme.palette.background.default,
					boxShadow: 24,
					borderRadius: 2,
					p: 3,
					border: '2px solid',
					borderColor: theme.palette.primary.main,
				}}
			>
				<Typography
					variant='h6'
					mb={2}
					sx={{ color: theme.palette.text.primary }}
				>
					{t.employee_filter}
				</Typography>

				<Stack spacing={2}>
					{/* Gender */}
					<FormControl fullWidth>
						<InputLabel>{t.gender}</InputLabel>
						<Select
							value={filter.gender}
							label={t.gender}
							onChange={e => handleChange('gender', e.target.value)}
						>
							<MenuItem value=''>{t.not_specified}</MenuItem>
							<MenuItem value='male'>{t.male}</MenuItem>
							<MenuItem value='female'>{t.female}</MenuItem>
						</Select>
					</FormControl>

					<TextField
						label={t.passport_series_and_number}
						fullWidth
						value={filter.passport_series_and_number}
						onChange={e =>
							handleChange('passport_series_and_number', e.target.value)
						}
					/>

					{/* PINFL */}
					<TextField
						label={t.PINFL}
						fullWidth
						value={filter.PINFL}
						onChange={e => handleChange('PINFL', e.target.value)}
					/>

					{/* Date of birth */}

					<Stack direction='row' spacing={2}>
						{/* День */}
						<FormControl fullWidth>
							<InputLabel>{t.date_of_birth}</InputLabel>
							<Select
								value={filter.date_of_birth || ''}
								label={t.date_of_birth}
								onChange={e =>
									handleChange('date_of_birth', Number(e.target.value))
								}
							>
								<MenuItem value=''>{t.not_specified}</MenuItem>
								{days.map(day => (
									<MenuItem key={day} value={day}>
										{day}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						{/* Месяц */}
						<FormControl fullWidth>
							<InputLabel>{t.birth_month}</InputLabel>
							<Select
								value={filter.birth_month || ''}
								label={t.birth_month}
								onChange={e =>
									handleChange('birth_month', Number(e.target.value))
								}
							>
								<MenuItem value=''>{t.not_specified}</MenuItem>
								{months.map((month, index) => (
									<MenuItem key={month} value={index + 1}>
										{t[month]}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						{/* Год */}
						<FormControl fullWidth>
							<InputLabel>{t.year_of_birth}</InputLabel>
							<Select
								value={filter.year_of_birth || ''}
								label={t.year_of_birth}
								onChange={e =>
									handleChange('year_of_birth', Number(e.target.value))
								}
							>
								<MenuItem value=''>{t.not_specified}</MenuItem>
								{years.map(year => (
									<MenuItem key={year} value={year}>
										{year}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>

					{/* Place of birth */}
					<TextField
						label={t.place_of_birth}
						fullWidth
						value={filter.place_of_birth}
						onChange={e => handleChange('place_of_birth', e.target.value)}
					/>

					{/* Nationality */}
					<TextField
						label={t.nationality}
						fullWidth
						value={filter.nationality}
						onChange={e => handleChange('nationality', e.target.value)}
					/>

					{/* Department */}
					<TextField
						label={t.department}
						fullWidth
						value={filter.department}
						onChange={e => handleChange('department', e.target.value)}
					/>

					{/* Position */}
					<TextField
						label={t.position}
						fullWidth
						value={filter.position}
						onChange={e => handleChange('position', e.target.value)}
					/>

					{/* Work Schedule */}
					<FormControl fullWidth>
						<InputLabel>{t.work_schedule}</InputLabel>
						<Select
							value={filter.work_schedule}
							label={t.work_schedule}
							onChange={e => handleChange('work_schedule', e.target.value)}
						>
							<MenuItem value=''>{t.not_specified}</MenuItem>
							<MenuItem value='full-time'>Полный день</MenuItem>
							<MenuItem value='part-time'>Неполный день</MenuItem>
							<MenuItem value='remote'>Удалённо</MenuItem>
						</Select>
					</FormControl>

					<Stack direction='row' spacing={2} mt={2} justifyContent='flex-end'>
						<Button variant='outlined' color='secondary' onClick={resetFilter}>
							{t.reset}
						</Button>
						<Button variant='contained' onClick={handleApply}>
							{t.apply}
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	)
}
