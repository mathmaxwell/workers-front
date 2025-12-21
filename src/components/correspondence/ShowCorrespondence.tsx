import { useQuery } from '@tanstack/react-query'
import type { IMessage } from '../../types/messages/message'
import { useTokenStore } from '../../store/token/useTokenStore'
import { getMessageWithUser, readedMessage } from '../../api/message/message'
import { useEffect, useRef, useState } from 'react'
import { Box, Divider, useTheme } from '@mui/material'
import { useTranslationStore } from '../../language/useTranslationStore'
import ShowChatText from '../messages/ShowChatText'
import MessageTextField from '../messages/MessageTextField'

const ShowCorrespondence = ({ id }: { id: string }) => {
	let lastDay = 0
	const [sendedMessages, setSendedMessages] = useState<IMessage[]>([])
	const { token } = useTokenStore()
	const theme = useTheme()
	const { t } = useTranslationStore()
	const { data: messagesWithUser } = useQuery<IMessage[]>({
		queryKey: ['messagesWithUser', token, id],
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
	}, [messagesWithUser])
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
					px: 1,
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
						{messagesWithUser?.map((msg, ind) => {
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

export default ShowCorrespondence
