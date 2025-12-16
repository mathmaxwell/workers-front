import type { IMessage } from '../../types/messages/message'
import api from '../api'

export async function getUnreadMessages({
	token,
}: {
	token: string
}): Promise<IMessage[]> {
	try {
		const { data } = await api.post('/messages/getUnreadMessages', {
			token,
		})
		return data
	} catch (error: any) {
		throw new Error('Неизвестная ошибка')
	}
}
export async function getLastMessages({
	token,
}: {
	token: string
}): Promise<IMessage[]> {
	try {
		const { data } = await api.post('/messages/getLastMessages', {
			token,
		})
		return data
	} catch (error: any) {
		throw new Error('Неизвестная ошибка')
	}
}
export async function getMessageWithUser({
	token,
	id,
}: {
	token: string
	id: string
}): Promise<IMessage[]> {
	try {
		const { data } = await api.post('/messages/getMessageWithUser', {
			token,
			employeeId: id,
		})
		return data
	} catch (error: any) {
		throw new Error('Неизвестная ошибка')
	}
}
export async function readedMessage({
	token,
	id,
}: {
	token: string
	id: string
}): Promise<IMessage[]> {
	try {
		const { data } = await api.post('/messages/readedMessage', {
			token,
			employeesId: id,
		})
		return data
	} catch (error: any) {
		throw new Error('Неизвестная ошибка')
	}
}

export async function createMessage({
	token,
	recipientIds,
	content,
	sentMinute,
	sentHour,
	sentDay,
	sentMonth,
	sentYear,
}: {
	token: string
	recipientIds: string
	content: string
	sentMinute: number
	sentHour: number
	sentDay: number
	sentMonth: number
	sentYear: number
}): Promise<IMessage> {
	try {
		const { data } = await api.post('/messages/createMessage', {
			token,
			recipientIds,
			content,
			sentMinute,
			sentHour,
			sentDay,
			sentMonth,
			sentYear,
		})
		return data as IMessage
	} catch (error: any) {
		throw new Error('Неизвестная ошибка')
	}
}
