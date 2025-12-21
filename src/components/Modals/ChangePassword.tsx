import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	Modal,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import { useTokenStore } from '../../store/token/useTokenStore'
import { useTranslationStore } from '../../language/useTranslationStore'
import { useChangePassword } from '../../store/modal/useChangePassword'
import { useState } from 'react'
import { login, updateUser } from '../../api/login/login'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import type { IUser } from '../../types/employees/employeesType'
import { getEmployeesById } from '../../api/employeesInfo/employeesInfo'
const ChangePassword = () => {
	const theme = useTheme()
	const [oldRole, setOldRole] = useState<number>(0)
	const { t } = useTranslationStore()
	const { token } = useTokenStore()
	const [isShow, setIsShow] = useState(false)
	const { id, isOpen, close } = useChangePassword()
	const [form, setForm] = useState<{ login: string; password: string }>({
		login: '',
		password: '',
	})
	async function handleSubmit(form: { login: string; password: string }) {
		try {
			if (oldRole == 0) {
				const result = await login(form)
				setForm({ login: '', password: '' })
				setOldRole(result.userRole)
			} else {
				await updateUser({
					login: form.login,
					password: form.password,
					userId: id,
					userRole: oldRole,
				})
				close()
			}
		} catch (error: any) {
			alert(error?.response?.data || error.message || 'Unknown error')
		}
	}

	return (
		<Modal open={isOpen} onClose={close}>
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
					{t.change_password}
				</Typography>
				<Typography
					variant='body1'
					mb={2}
					sx={{ color: theme.palette.text.primary }}
				>
					{oldRole == 0 ? t.enter_old_data : t.enter_new_data}
				</Typography>
				<Box>
					<TextField
						fullWidth
						variant='outlined'
						placeholder='Login'
						onKeyDown={e => e.key === 'Enter' && handleSubmit(form)}
						value={form.login}
						onChange={e => setForm({ ...form, login: e.target.value })}
					/>

					<TextField
						fullWidth
						variant='outlined'
						placeholder='Password'
						type={isShow ? 'text' : 'password'}
						value={form.password}
						onKeyDown={e => e.key === 'Enter' && handleSubmit(form)}
						onChange={e => setForm({ ...form, password: e.target.value })}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={() => setIsShow(prev => !prev)}
										edge='end'
									>
										{isShow ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<Button
						variant='contained'
						size='large'
						disabled={!form.login || !form.password}
						onClick={() => handleSubmit(form)}
						color='info'
					>
						{t.confirm}
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}

export default ChangePassword
