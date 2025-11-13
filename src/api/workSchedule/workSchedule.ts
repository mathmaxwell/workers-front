import type {
	ITardinessHistory,
	IWorkSchedule,
} from '../../types/workSchedule/workSchedule'
import api from '../api'

export async function getEmployeeWorkSchedule({
	token,
	id,
	startMonthSchedule,
	startYearSchedule,
}: {
	token: string
	id: string
	startMonthSchedule: number
	startYearSchedule: number
}): Promise<IWorkSchedule[]> {
	try {
		const { data } = await api.post('/employees/getEmployeeWorkSchedule', {
			token,
			id,
			startMonthSchedule,
			startYearSchedule,
		})
		return data
	} catch (error: any) {
		return [
			{
				startDay: 1,
				startMonth: startMonthSchedule,
				startYear: startYearSchedule,
				endDay: 1,
				endMonth: startMonthSchedule,
				endYear: startYearSchedule,
				workSchedule: [
					{
						startHour: 9,
						startDay: 2,
						startMonth: startMonthSchedule,
						startYear: startYearSchedule,
						endHour: 18,
						endDay: 2,
						endMonth: startMonthSchedule,
						endYear: startYearSchedule,
					},
					{
						startHour: 9,
						startDay: 3,
						startMonth: startMonthSchedule,
						startYear: startYearSchedule,
						endHour: 18,
						endDay: 3,
						endMonth: startMonthSchedule,
						endYear: startYearSchedule,
					},
				],
			},
		]
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
