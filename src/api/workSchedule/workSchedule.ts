import type {
	ITardinessHistory,
	IWorkSchedule,
	IWorkScheduleForDay,
} from '../../types/workSchedule/workSchedule'
import api from '../api'

export async function getEmployeeWorkScheduleForMonth({
	token,
	id,
	startMonthSchedule,
	startYearSchedule,
}: {
	token: string
	id: string
	startMonthSchedule: number
	startYearSchedule: number
}): Promise<IWorkSchedule> {
	try {
		const { data } = await api.post('/workSchedule/getWorkScheduleForMonth', {
			token,
			id,
			startMonthSchedule,
			startYearSchedule,
		})
		return data
	} catch (error: any) {
		throw new Error('Неизвестная ошибка')
	}
}

export async function getTardinessHistoryById({
	token,
	id,
	startMonthSchedule,
	startYearSchedule,
	endMonthSchedule,
	endYearSchedule,
}: {
	token: string
	id: string
	startMonthSchedule: number
	startYearSchedule: number
	endMonthSchedule: number
	endYearSchedule: number
}): Promise<ITardinessHistory[]> {
	try {
		const { data } = await api.post('/employees/getTardinessHistoryById', {
			token,
			id,
			startMonthSchedule,
			startYearSchedule,
			endMonthSchedule,
			endYearSchedule,
		})
		return data
	} catch (error: any) {
		return []
	}
}
export async function updateWorkSchedule({
	token,
	workSchedule,
}: {
	token: string
	workSchedule: IWorkScheduleForDay
}): Promise<ITardinessHistory[]> {
	try {
		const { data } = await api.post('/workSchedule/updateWorkSchedule', {
			token,
			id: workSchedule.id || 'test',
			startHour: workSchedule.startHour,
			startDay: workSchedule.startDay,
			startMonth: workSchedule.startMonth,
			startYear: workSchedule.startYear,
			endHour: workSchedule.endHour,
			endDay: workSchedule.endDay,
			endMonth: workSchedule.endMonth,
			endYear: workSchedule.endYear,
		})
		return data
	} catch (error: any) {
		return []
	}
}
