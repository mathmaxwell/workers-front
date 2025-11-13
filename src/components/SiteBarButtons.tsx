import { Button, useTheme } from '@mui/material'
import dashboardSvg from '../assets/icons/dashboardSvg.svg'
import base from '../assets/icons/base.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslationStore } from '../language/useTranslationStore'

const SiteBarButtons = ({ name }: { name: 'dashboard' | 'base' }) => {
	const { t } = useTranslationStore()
	const { pathname } = useLocation()
	const isHere = pathname == `/${name}`
	const navigate = useNavigate()
	const theme = useTheme()
	return (
		<>
			<Button
				variant={isHere ? 'contained' : 'outlined'}
				sx={{
					height: '44px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'start',
					gap: 2,
					color: isHere
						? theme.palette.background.default
						: theme.palette.primary.main,
				}}
				onClick={() => {
					navigate(`/${name}`)
				}}
			>
				<img src={name == 'dashboard' ? dashboardSvg : base} alt='image' />
				{t[name]}
			</Button>
		</>
	)
}

export default SiteBarButtons
