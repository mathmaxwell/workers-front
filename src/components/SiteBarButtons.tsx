import { Button, useTheme } from '@mui/material'
import dashboardSvg from '../assets/icons/dashboardSvg.svg'
import base from '../assets/icons/base.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslationStore } from '../language/useTranslationStore'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useQuery } from '@tanstack/react-query'
import { getUnreadMessages } from '../api/message/message'
import { useTokenStore } from '../store/token/useTokenStore'
import type { IMessage } from '../types/messages/message'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
const SiteBarButtons = ({
	name,
}: {
	name: 'dashboard' | 'base' | 'messages' | 'schedules'
}) => {
	const { t } = useTranslationStore()
	const { pathname } = useLocation()
	const isHere = pathname == `/${name}`
	const navigate = useNavigate()
	const theme = useTheme()
	const { token } = useTokenStore()
	const { data: unreadMessagesCount } = useQuery<IMessage[]>({
		queryKey: ['unreadMessagesCount', token],
		queryFn: async () => {
			const result = await getUnreadMessages({ token })
			return result || []
		},
		enabled: !!token,
	})
	const isMessage =
		unreadMessagesCount == undefined ? false : unreadMessagesCount?.length > 0
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
				{name == 'messages' ? (
					<NotificationsIcon
						sx={{ width: '24px', height: '24px' }}
						color={isMessage ? 'error' : 'info'}
					/>
				) : name === 'schedules' ? (
					<EditCalendarIcon
						sx={{
							color: isHere
								? theme.palette.background.default
								: theme.palette.primary.main,
						}}
					/>
				) : (
					<img src={name == 'dashboard' ? dashboardSvg : base} alt='image' />
				)}

				{t[name]}
			</Button>
		</>
	)
}

export default SiteBarButtons
