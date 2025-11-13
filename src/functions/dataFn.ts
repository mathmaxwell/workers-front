import { eachDayOfInterval, isSameDay } from 'date-fns'
import type { ITardinessHistory } from '../types/workSchedule/workSchedule'

export const getTodayRange = () => {
	const now = new Date()
	const start = new Date(now)
	start.setHours(0, 0, 0, 0)
	const end = new Date(now)
	end.setHours(23, 59, 59, 999)
	return { start, end }
}
export const getCurrentWeekRange = () => {
	const now = new Date()
	const dayOfWeek = now.getDay()
	const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
	const start = new Date(now)
	start.setDate(now.getDate() + diffToMonday)
	start.setHours(0, 0, 0, 0)
	const end = new Date(start)
	end.setDate(start.getDate() + 6)
	end.setHours(23, 59, 59, 999)

	return { start, end }
}
export const getCurrentMonthRange = () => {
	const now = new Date()
	const start = new Date(now.getFullYear(), now.getMonth(), 1)
	start.setHours(0, 0, 0, 0)
	const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
	end.setHours(23, 59, 59, 999)
	return { start, end }
}
export const getMonthRange = (date: Date) => {
	const start = new Date(date.getFullYear(), date.getMonth(), 1)
	start.setHours(0, 0, 0, 0)
	const end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
	end.setHours(23, 59, 59, 999)

	return { start, end }
}
export const getPrevMonthRange = (date: Date) => {
	const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1)
	return getMonthRange(prevMonth)
}

export const getNextMonthRange = (date: Date) => {
	const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1)
	return getMonthRange(nextMonth)
}
export const getWeekRange = (date: Date) => {
	const dayOfWeek = date.getDay()
	const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

	const start = new Date(date)
	start.setDate(date.getDate() + diffToMonday)
	start.setHours(0, 0, 0, 0)

	const end = new Date(start)
	end.setDate(start.getDate() + 6)
	end.setHours(23, 59, 59, 999)

	return { start, end }
}

export const getPrevWeekRange = (date: Date) => {
	const prevWeek = new Date(date)
	prevWeek.setDate(date.getDate() - 7)
	return getWeekRange(prevWeek)
}
export const getNextWeekRange = (date: Date) => {
	const nextWeek = new Date(date)
	nextWeek.setDate(date.getDate() + 7)
	return getWeekRange(nextWeek)
}

export const getLateStatsArray = (
	employees: ITardinessHistory[] = [],
	startDate: Date,
	endDate: Date
) => {
	const allDays = eachDayOfInterval({ start: startDate, end: endDate })
	const stats = allDays.map(day => {
		const count = employees.filter(e => isSameDay(new Date(e.date), day)).length
		return count
	})

	return stats
}
