import { Box, Button, Typography, useTheme } from '@mui/material'
import full from '../assets/full.svg'
import { useThemeStore } from '../theme/theme'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SunnyIcon from '@mui/icons-material/Sunny'
import UzbekSvg from '../assets/svg/Uzbak'
import RussiaSvg from '../assets/svg/Russia'
import { useTranslationStore } from '../language/useTranslationStore'
import SiteBarButtons from './SiteBarButtons'
import { useNavigate } from 'react-router-dom'
import { useTokenStore } from '../store/token/useTokenStore'

const SiteBar = () => {
	const { resetToken, userRole } = useTokenStore()
	const navigate = useNavigate()
	const { lang, setLang, t } = useTranslationStore()
	const { theme: darkOrLigth, setTheme } = useThemeStore()
	const theme = useTheme()
	return (
		<Box
			sx={{
				height: '100%',
				width: '250px',
				bgcolor: theme.palette.background.paper,
				zIndex: 2,
				position: 'relative',
				top: 0,
				left: 0,
				p: '10px',
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
				borderRadius: 2,
				border: '1px solid',
				borderColor: theme.palette.primary.main,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Box
					sx={{
						height: '40px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'start',
						gap: 1,
						transition: '0.5s',
					}}
				>
					<>
						<img src={full} alt='logo' style={{ height: '100%' }} />
						<Typography
							sx={{ fontSize: '14px', color: theme.palette.primary.main }}
						>
							TAD <br /> INDUSTRIES
						</Typography>
					</>
				</Box>
				<Box
					onClick={() => {
						setLang(lang == 'uz' ? 'ru' : 'uz')
					}}
					sx={{
						width: '30px',
						height: '30px',
						marginLeft: 'auto',
					}}
				>
					{lang == 'uz' ? <UzbekSvg /> : <RussiaSvg />}
				</Box>
				<Box
					onClick={() => {
						setTheme(darkOrLigth == 'dark' ? 'light' : 'dark')
					}}
					sx={{
						width: '50px',
						height: '30px',
						display: 'flex',
						justifyContent: 'flex-' + (darkOrLigth == 'dark' ? 'start' : 'end'),
						alignItems: 'center',
						borderRadius: 1,
						border: '1px solid',
						borderColor: theme.palette.primary.main,
					}}
				>
					{darkOrLigth == 'dark' ? <DarkModeIcon /> : <SunnyIcon />}
				</Box>
			</Box>
			<Typography
				sx={{
					fontSize: '30px',
					color: theme.palette.primary.main,
					fontWeight: 600,
				}}
			>
				FaceIDS
			</Typography>
			{userRole !== '99' && <SiteBarButtons name={'dashboard'} />}
			{userRole !== '99' && <SiteBarButtons name={'base'} />}
			<SiteBarButtons name={'messages'} />
			<SiteBarButtons name={'schedules'} />
			{userRole == '1' && <SiteBarButtons name={'admin_page'} />}
			<Button
				onClick={() => {
					resetToken()
					navigate('/register')
				}}
				variant='outlined'
			>
				{t.back}
			</Button>
		</Box>
	)
}

export default SiteBar
