export interface IMessage {
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
}
