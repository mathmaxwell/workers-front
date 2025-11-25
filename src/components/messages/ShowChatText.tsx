import { Box, Chip, Typography, useTheme } from '@mui/material'
import type { IMessage } from '../../types/messages/message'
import { useTokenStore } from '../../store/token/useTokenStore'
import { useTranslationStore } from '../../language/useTranslationStore'
import DoneIcon from '@mui/icons-material/Done'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { monthNames } from '../../types/time/time'
const ShowChatText = ({
	msg,
	showDate,
}: {
	msg: IMessage
	showDate: boolean
}) => {
	const theme = useTheme()
	const { token } = useTokenStore()
	const { t } = useTranslationStore()
	const toMe = msg.recipientIds == token

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{showDate && (
				<Chip
					key={msg.sentDay * msg.sentMonth}
					label={`${msg.sentDay} - ${t[monthNames[msg.sentMonth - 1]]}`}
				/>
			)}
			<Box
				sx={{
					mt: 1,
					ml: toMe ? '' : 'auto',
					mr: toMe ? 'auto' : '',
					p: 2,
					bgcolor: theme.palette.background.paper,
					borderRadius: toMe ? '20px 20px 20px 0px' : '20px 20px 0px 20px',
					border: '1px solid',
					borderColor: theme.palette.primary.main,
					width: '400px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'start',
					justifyContent: 'start',
					gap: 0.5,
				}}
			>
				<Typography sx={{ textWrap: 'wrap', overflowWrap: 'anywhere' }}>
					{msg.content}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						width: '100%',
					}}
				>
					<Typography>{`${msg.sentMinute
						.toString()
						.padStart(2, '0')}:${msg.sentHour.toString().padStart(2, '0')}
										`}</Typography>
					<Typography>
						{toMe ? (
							<>
								<DoneAllIcon color='info' />
							</>
						) : msg.isRead ? (
							<DoneAllIcon color='success' />
						) : (
							<DoneIcon color='success' />
						)}
					</Typography>
				</Box>
			</Box>
		</Box>
	)
}

export default ShowChatText
