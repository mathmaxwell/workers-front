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
import { login } from '../../api/login/login'
import { useTokenStore } from '../../store/token/useTokenStore'
import { useNavigate } from 'react-router-dom'

const Register = () => {
	const navigate = useNavigate()
	const { setToken } = useTokenStore()
	const [error, setError] = useState<boolean>(false)
	const { t } = useTranslationStore()
	const theme = useTheme()
	const [isShow, setIsShow] = useState(false)
	const [form, setForm] = useState({ login: '', password: '' })
	async function handleSubmit(form: { login: string; password: string }) {
		try {
			const result = await login(form)
			if (result.error) {
				alert(result.error)
				setError(true)
			} else {
				setError(false)
				setToken(result.token)
				navigate('/dashboard')
			}
		} catch (error) {
			setError(true)
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
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					height: '100%',
					objectFit: 'cover',
					zIndex: 1,
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
					error={error}
					value={form.login}
					onChange={e => setForm({ ...form, login: e.target.value })}
				/>

				<TextField
					fullWidth
					error={error}
					variant='outlined'
					placeholder='Password'
					type={isShow ? 'text' : 'password'}
					value={form.password}
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
					sx={{ mt: 1, borderRadius: 2, color: theme.palette.secondary.main }}
					onClick={() => {
						handleSubmit(form)
					}}
				>
					{t.enter}
				</Button>
			</Box>
		</Box>
	)
}

export default Register
