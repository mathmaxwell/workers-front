import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import face from '../../assets/face.svg'
import { useTranslationStore } from '../../language/useTranslationStore'
import { useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { login, register } from '../../api/login/login'
import { useTokenStore } from '../../store/token/useTokenStore'
import { useNavigate } from 'react-router-dom'
import type { IUser } from '../../types/employees/employeesType'
import { useEmployeesModalStore } from '../../store/modal/useCreateEmployeesModal'
import { getEmployeesById } from '../../api/employeesInfo/employeesInfo'

const Register = () => {
	const { openModal, setEmployee } = useEmployeesModalStore()
	const navigate = useNavigate()
	const [isLogin, setIsLogin] = useState(true)
	const { setToken } = useTokenStore()
	const { t } = useTranslationStore()
	const theme = useTheme()
	const [isShow, setIsShow] = useState(false)
	const [form, setForm] = useState<{ login: string; password: string }>({
		login: '',
		password: '',
	})

	async function handleSubmit(form: { login: string; password: string }) {
		try {
			if (isLogin) {
				const result = (await login(form)) as IUser
				setToken(result.token)
				if (result.userRole == 1) {
					navigate('/dashboard')
					return
				}
				const isCorrect = await getEmployeesById({
					token: result.token,
					id: result.token,
				})
				if (isCorrect.accepted) {
					navigate('/dashboard')
				} else {
					alert(t.wait_for_admin_approval)
				}
			} else {
				const result = (await register(form)) as IUser
				openModal()
				setEmployee({ mode: 'create' })
				setToken(result.token)
			}
		} catch (error: any) {
			alert(error?.response?.data || error.message || 'Unknown error')
		}
	}
	return (
		<Box
			sx={{
				width: '100vw',
				height: '100vh',
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: theme.palette.background.default,
			}}
		>
			<img
				src={face}
				alt='logo'
				loading='lazy'
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					height: '100%',
					objectFit: 'cover',
					zIndex: 0,
					opacity: 0.2,
				}}
			/>
			<Box
				sx={{
					width: '500px',
					border: '2px solid',
					borderColor: 'divider',
					borderRadius: 3,
					display: 'flex',
					flexDirection: 'column',
					gap: 3,
					p: 5,
					backgroundColor: theme.palette.background.paper,
					boxShadow: 3,
				}}
			>
				<Typography
					variant='h4'
					sx={{ color: theme.palette.primary.main, textAlign: 'center' }}
				>
					FaceIDS
				</Typography>

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
								<IconButton onClick={() => setIsShow(prev => !prev)} edge='end'>
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
					{isLogin ? t.system_login : t.create_account}
				</Button>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						gap: 5,
					}}
				>
					<Box
						sx={{ width: '100%', height: '2px', border: '1px solid black' }}
					/>
					<Typography>{t.or}</Typography>
					<Box
						sx={{ width: '100%', height: '2px', border: '1px solid black' }}
					/>
				</Box>
				<Button
					onClick={() => {
						setIsLogin(prev => !prev)
					}}
					variant='outlined'
				>
					{isLogin ? t.register : t.login}
				</Button>
			</Box>
		</Box>
	)
}

export default Register
