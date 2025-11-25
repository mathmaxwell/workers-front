import { Box, IconButton, Input } from '@mui/material'
import { useTranslationStore } from '../../language/useTranslationStore'
import SendIcon from '@mui/icons-material/Send'
import { createMessage } from '../../api/message/message'
import { useState } from 'react'
import { useTokenStore } from '../../store/token/useTokenStore'
import type { IMessage } from '../../types/messages/message'
const MessageTextField = ({
	recipientIds,
	setSendedMessages,
}: {
	recipientIds: string
	setSendedMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
}) => {
	const { t } = useTranslationStore()
	const { token } = useTokenStore()
	const [content, setContent] = useState<string>('')
	return (
		<>
			<Box
				sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<Input
					value={content}
					onChange={e => {
						setContent(e.target.value)
					}}
					sx={{ width: '100%', p: '5px 20px' }}
					placeholder={t.send_message}
				/>
				<IconButton
					onClick={async () => {
						const now = new Date()
						const sentMinute = now.getMinutes()
						const sentHour = now.getHours()
						const sentDay = now.getDate()
						const sentMonth = now.getMonth() + 1
						const sentYear = now.getFullYear()
						const result = await createMessage({
							token,
							recipientIds,
							content,
							sentMinute,
							sentHour,
							sentDay,
							sentMonth,
							sentYear,
						})
						setSendedMessages(prev => [...prev, result])
						setContent('')
					}}
				>
					<SendIcon />
				</IconButton>
			</Box>
		</>
	)
}

export default MessageTextField
