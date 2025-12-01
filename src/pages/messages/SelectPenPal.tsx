import {
	Avatar,
	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	useTheme,
} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { useQuery } from '@tanstack/react-query'
import type { IMessage } from '../../types/messages/message'
import { useTokenStore } from '../../store/token/useTokenStore'
import { getLastMessages } from '../../api/message/message'
import Loading from '../../components/Loading/Loading'
import { useEffect, useState } from 'react'
import { getEmployeesById } from '../../api/employeesInfo/employeesInfo'
import type { IEmployees } from '../../types/employees/employeesType'
import { useNavigate } from 'react-router-dom'
import Line from '../../components/Line'
const SelectPenPal = () => {
	const navigate = useNavigate()
	const theme = useTheme()
	const { token } = useTokenStore()
	const [messagesWithUsers, setMessagesWithUsers] = useState<
		{
			user: IEmployees
			toMe: boolean
			id: string
			senderId: string
			recipientIds: string
			content: string
			sentMinute: number
			sentHour: number
			sentDay: number
			sentMonth: number
			sentYear: number
			isRead: boolean
			isToday: boolean
		}[]
	>([])

	const { data: messages, isLoading } = useQuery<IMessage[]>({
		queryKey: ['messages', token],
		queryFn: async () => {
			const result = await getLastMessages({ token })
			return result || []
		},
		enabled: !!token,
	})

	useEffect(() => {
		const loadUsers = async () => {
			if (messages == undefined) {
				return
			}
			const now = new Date()
			const day = now.getDate()
			const month = now.getMonth() + 1
			const year = now.getFullYear()
			const enriched = await Promise.all(
				messages.map(async msg => {
					const isToday =
						day == msg.sentDay && month == msg.sentMonth && year == msg.sentYear
					const toMe = msg.recipientIds === token
					const userId = toMe ? msg.senderId : msg.recipientIds
					const user = await getEmployeesById({ token, id: userId })
					return { ...msg, user, toMe, isToday }
				})
			)
			setMessagesWithUsers(enriched)
		}
		if (messages) loadUsers()
	}, [messages])

	if (isLoading) {
		return <Loading />
	}
	return (
		<>
			<Box
				sx={{
					height: '100%',
					width: '50%',
					bgcolor: theme.palette.background.default,
					borderRadius: 2,
					border: '1px solid',
					borderColor: theme.palette.primary.main,
					overflowY: 'auto',
				}}
			>
				<List sx={{ width: '100%' }}>
					{messagesWithUsers?.map((msg, ind) => {
						const labelId = `checkbox-list-secondary-label-${msg.id}`
						return (
							<Box key={ind}>
								<ListItem
									onClick={() => {
										navigate(`/messages/${msg.user.id}`)
									}}
									key={1}
									disablePadding
									sx={{ p: 1, cursor: 'pointer', height: '60px' }}
								>
									<ListItemAvatar>
										<Avatar
											alt={'image'}
											src={
												typeof msg.user.image == 'string'
													? msg.user.image
													: URL.createObjectURL(msg.user.image)
											}
										/>
									</ListItemAvatar>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											width: '100%',
										}}
									>
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<ListItemText
												id={labelId}
												primary={msg.user.full_name}
												sx={{ textWrap: 'nowrap' }}
											/>
											<ListItemText
												id={labelId}
												primary={
													msg.isToday
														? `${msg.sentMinute
																.toString()
																.padStart(2, '0')}:${msg.sentHour
																.toString()
																.padStart(2, '0')}`
														: `${msg.sentDay
																.toString()
																.padStart(2, '0')}.${msg.sentMonth
																.toString()
																.padStart(2, '0')}.${msg.sentYear}`
												}
												sx={{ textWrap: 'nowrap', textAlign: 'right' }}
											/>
										</Box>
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<ListItemText
												id={labelId}
												primary={msg.content.slice(0, 25)}
												sx={{ textWrap: 'nowrap' }}
											/>
											{msg.toMe ? (
												msg.isRead ? (
													<DoneAllIcon color='info' />
												) : (
													<PriorityHighIcon color='error' />
												)
											) : msg.isRead ? (
												<DoneAllIcon color='success' />
											) : (
												<DoneIcon color='success' />
											)}
										</Box>
									</Box>
								</ListItem>

								<Line />
							</Box>
						)
					})}
				</List>
			</Box>
		</>
	)
}

export default SelectPenPal
