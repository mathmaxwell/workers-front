import { Box, useTheme } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTranslationStore } from '../../language/useTranslationStore'
import { useQuery } from '@tanstack/react-query'
import type { IMessage } from '../../types/messages/message'
import { useTokenStore } from '../../store/token/useTokenStore'
import { getMessageWithUser, readedMessage } from '../../api/message/message'
import Divider from '@mui/material/Divider'
import { useEffect, useRef, useState } from 'react'
import MessageTextField from '../../components/messages/MessageTextField'
import ShowChatText from '../../components/messages/ShowChatText'

const Dialog = () => {
	let lastDay = 0
	const theme = useTheme()
	const { token } = useTokenStore()
	const { id } = useParams()
	const { t } = useTranslationStore()
	const [sendedMessages, setSendedMessages] = useState<IMessage[]>([])
	const { data: messageWithUser } = useQuery<IMessage[]>({
		queryKey: ['messageWithUser', token, id],
		queryFn: async () => {
			if (!id) {
				return []
			}
			const result = await getMessageWithUser({ token, id })
			const reverseResult: IMessage[] = []
			for (const msg of result) {
				const toMe = msg.recipientIds == token
				if (toMe && !msg.isRead) {
					readedMessage({ token, id: msg.id })
					msg.isRead = true
				}
				reverseResult.push(msg)
			}
			return reverseResult || []
		},
		enabled: !!token || !!id,
	})
	const messagesEndRef = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' })
	}, [messageWithUser])

	return (
		<>
			<Box
				sx={{
					height: '100%',
					width: '100%',
					p: '10px',
					bgcolor: theme.palette.background.default,
					borderRadius: 2,
					border: '1px solid',
					borderColor: theme.palette.primary.main,
				}}
			>
				{id === undefined ? (
					t.select_chat
				) : (
					<Box
						sx={{
							width: '100%',
							height: '100%',
							overflowY: 'auto',
						}}
					>
						{messageWithUser?.map((msg, ind) => {
							let showDate = msg.sentDay != lastDay
							if (showDate) {
								lastDay = msg.sentDay
							}
							return <ShowChatText key={ind} msg={msg} showDate={showDate} />
						})}
						{sendedMessages.length > 0 && (
							<Box sx={{ mt: 2 }}>
								<Divider />
								{sendedMessages.map((msg, ind) => {
									return <ShowChatText key={ind} msg={msg} showDate={false} />
								})}
							</Box>
						)}
						<MessageTextField
							recipientIds={id}
							setSendedMessages={setSendedMessages}
						/>
						<div ref={messagesEndRef} />
					</Box>
				)}
			</Box>
		</>
	)
}

export default Dialog
