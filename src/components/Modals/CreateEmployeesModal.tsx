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
	Autocomplete,
} from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { useTranslationStore } from '../../language/useTranslationStore'
import { months } from '../../types/filterType'
import { useEmployeesModalStore } from '../../store/modal/useCreateEmployeesModal'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import {
	createEmployees,
	updateEmployees,
} from '../../api/employeesInfo/employeesInfo'
import { useTokenStore } from '../../store/token/useTokenStore'
import {
	createDepartment,
	getDepartment,
} from '../../api/deportament/deportament'
import type { IDepartment } from '../../types/department/departmentType'
import { useQuery } from '@tanstack/react-query'
import { createUser, register } from '../../api/login/login'
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 70 }, (_, i) => currentYear - i)
export const CreateEmployeesModal = () => {
	const apiUrl = import.meta.env.VITE_API_URL
	const { token } = useTokenStore()
	const theme = useTheme()
	const { t } = useTranslationStore()
	const { employee, setEmployee, closeModal, resetEmployee } =
		useEmployeesModalStore()
	const handleChange = (
		key: keyof typeof employee,
		value: string | number | File
	) => setEmployee({ [key]: value })
	async function handleApply() {
		try {
			if (employee.mode == 'create') {
				const result = await createEmployees({
					token,
					gender: employee.gender,
					passport_series_and_number: employee.passport_series_and_number,
					PINFL: employee.PINFL,
					full_name: employee.full_name,
					image: employee.image,
					department: employee.department,
					position: employee.position,
					date_of_birth: employee.date_of_birth,
					birth_month: employee.birth_month,
					year_of_birth: employee.year_of_birth,
					place_of_birth: employee.place_of_birth,
					nationality: employee.nationality,
					Email: employee.Email,
					phone_number: employee.phone_number,
				})
				await createUser({
					login: employee.passport_series_and_number,
					password: employee.passport_series_and_number,
					userId: result.id,
				})
				alert(`login - ${employee.passport_series_and_number}
					password - ${employee.passport_series_and_number}`)
			} else {
				await updateEmployees({
					token,
					id: employee.id,
					gender: employee.gender,
					passport_series_and_number: employee.passport_series_and_number,
					PINFL: employee.PINFL,
					full_name: employee.full_name,
					image: employee.image,
					department: employee.department,
					position: employee.position,
					date_of_birth: employee.date_of_birth,
					birth_month: employee.birth_month,
					year_of_birth: employee.year_of_birth,
					place_of_birth: employee.place_of_birth,
					nationality: employee.nationality,
					Email: employee.Email,
					phone_number: employee.phone_number,
					accepted: employee.accepted,
				})
			}
			closeModal()
		} catch (error) {}
	}

	const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			handleChange('image', file)
		}
	}
	const { data: deportaments } = useQuery<IDepartment[]>({
		queryKey: ['deportaments'],
		queryFn: async () => {
			const result = await getDepartment({
				token,
			})
			return result || []
		},
	})
	async function handlerAddDep(newDepName: string) {
		const exists = deportaments?.some(dep => dep.name === newDepName)
		if (exists) {
			return
		}
		try {
			await createDepartment({ token, name: newDepName })
		} catch (error) {}
	}

	return (
		<Modal open={employee.isOpen} onClose={closeModal}>
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
					variant='h6'
					mb={2}
					sx={{ color: theme.palette.text.primary }}
				>
					{employee.mode == 'update' ? t.edit : t.add_employees}
				</Typography>
				<Stack spacing={2}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 2,
							width: '100%',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 2,
								width: '100%',
							}}
						>
							{/* full_name */}
							<TextField
								label={t.full_name}
								fullWidth
								value={employee.full_name}
								onChange={e => handleChange('full_name', e.target.value)}
							/>
							{/* passport_series_and_number */}
							<TextField
								label={t.passport_series_and_number}
								fullWidth
								value={employee.passport_series_and_number}
								onChange={e =>
									handleChange('passport_series_and_number', e.target.value)
								}
							/>

							{/* PINFL */}
							<TextField
								label={t.PINFL}
								fullWidth
								value={employee.PINFL}
								onChange={e => handleChange('PINFL', e.target.value)}
							/>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 2,
								alignItems: 'center',
								justifyContent: 'center',
								width: '300px',
								height: '200px',
							}}
						>
							{employee.image === '' ? (
								<Box
									sx={{
										width: '200px',
										height: '150px',
										bgcolor: theme => theme.palette.grey[500],
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<CameraAltIcon />
								</Box>
							) : (
								<img
									src={
										typeof employee.image === 'string'
											? `${apiUrl}${employee.image}`
											: URL.createObjectURL(employee.image)
									}
									alt='image'
									style={{
										width: '200px',
										height: '150px',
										objectFit: 'cover',
									}}
								/>
							)}
							<Button
								variant='contained'
								component='label'
								startIcon={<PhotoCamera />}
								sx={{ width: '100%' }}
							>
								{t.upload_photo}
								<input
									type='file'
									hidden
									accept='image/*'
									onChange={handlePhotoChange}
								/>
							</Button>
						</Box>
					</Box>
					{/* Date of birth */}
					<Stack direction='row' spacing={1}>
						{/* День */}
						<FormControl fullWidth>
							<InputLabel>{t.date_of_birth}</InputLabel>
							<Select
								value={employee.date_of_birth || ''}
								label={t.date_of_birth}
								onChange={e =>
									handleChange('date_of_birth', Number(e.target.value))
								}
							>
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
								value={employee.birth_month || ''}
								label={t.birth_month}
								onChange={e =>
									handleChange('birth_month', Number(e.target.value))
								}
							>
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
								value={employee.year_of_birth || ''}
								label={t.year_of_birth}
								onChange={e =>
									handleChange('year_of_birth', Number(e.target.value))
								}
							>
								{years.map(year => (
									<MenuItem key={year} value={year}>
										{year}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						{/* Gender */}
						<FormControl fullWidth>
							<InputLabel>{t.gender}</InputLabel>
							<Select
								value={employee.gender}
								label={t.gender}
								onChange={e => handleChange('gender', e.target.value)}
							>
								<MenuItem value='male'>{t.male}</MenuItem>
								<MenuItem value='female'>{t.female}</MenuItem>
							</Select>
						</FormControl>
					</Stack>

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 1,
						}}
					>
						{/* phone_number */}
						<TextField
							label={t.phone_number}
							fullWidth
							value={employee.phone_number || ''}
							onChange={e => {
								let value = e.target.value.replace(/\D/g, '')
								if (value.startsWith('998')) {
									value = value.slice(3)
								}
								value = value.slice(0, 9)
								let formatted = '+998'
								if (value.length > 0) {
									formatted += ` (${value.slice(0, 2)}`
								}
								if (value.length >= 2) {
									formatted += `) ${value.slice(2, 5)}`
								}
								if (value.length >= 5) {
									formatted += `-${value.slice(5, 7)}`
								}
								if (value.length >= 7) {
									formatted += `-${value.slice(7, 9)}`
								}
								handleChange('phone_number', formatted)
							}}
							placeholder='+998 (XX) XXX-XX-XX'
						/>
						{/* Email */}
						<TextField
							type='email'
							label={t.Email}
							fullWidth
							value={employee.Email}
							onChange={e => handleChange('Email', e.target.value)}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 1,
						}}
					>
						{/* Place of birth */}
						<TextField
							label={t.place_of_birth}
							fullWidth
							value={employee.place_of_birth}
							onChange={e => handleChange('place_of_birth', e.target.value)}
						/>

						{/* Nationality */}
						<TextField
							label={t.nationality}
							fullWidth
							value={employee.nationality}
							onChange={e => handleChange('nationality', e.target.value)}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 1,
						}}
					>
						{/* Department */}

						<Autocomplete
							sx={{ width: '100%' }}
							freeSolo
							options={deportaments ? deportaments!.map(d => d.name) : ['']}
							value={employee.department}
							onChange={(_, newValue) => {
								handleChange('department', newValue || '')
							}}
							onInputChange={(_, newInputValue) => {
								handleChange('department', newInputValue)
							}}
							renderInput={params => (
								<TextField {...params} label={t.department} fullWidth />
							)}
						/>
						{/* Position */}
						<TextField
							label={t.position}
							fullWidth
							value={employee.position}
							onChange={e => handleChange('position', e.target.value)}
						/>
					</Box>
					<Stack direction='row' spacing={2} mt={2} justifyContent='flex-end'>
						<Button
							variant='outlined'
							color='secondary'
							onClick={resetEmployee}
						>
							{t.reset}
						</Button>
						<Button
							variant='contained'
							onClick={() => {
								handleApply()
								handlerAddDep(employee.department)
							}}
						>
							{t.save}
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	)
}
