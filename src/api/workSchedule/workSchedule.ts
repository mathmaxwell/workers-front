import type {
	ITardinessHistory,
	IWorkSchedule,
	IWorkScheduleForDay,
} from '../../types/workSchedule/workSchedule'
import api from '../api'

export async function updateWorkSchedule({
	token,
	workSchedule,
}: {
	token: string
	workSchedule: IWorkScheduleForDay
}): Promise<ITardinessHistory[]> {
	try {
		const { data } =
			workSchedule.id === 'create'
				? await api.post('/workSchedule/createWorkSchedule', {
						token,
						EmployeeId: workSchedule.EmployeeId,
						startHour: workSchedule.startHour,
						startDay: workSchedule.startDay,
						startMonth: workSchedule.startMonth,
						startYear: workSchedule.startYear,
						endHour: workSchedule.endHour,
						endDay: workSchedule.endDay,
						endMonth: workSchedule.endMonth,
						endYear: workSchedule.endYear,
				  })
				: await api.post('/workSchedule/updateWorkSchedule', {
						token,
						id: workSchedule.id,
						EmployeeId: workSchedule.EmployeeId,
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

export async function getEmployeeWorkSchedule({
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
}): Promise<IWorkSchedule> {
	try {
		const { data } = await api.post('/workSchedule/getEmployeeWorkSchedule', {
			token,
			employeeId: id,
			startDaySchedule: 1,
			startMonthSchedule,
			startYearSchedule,
			endDaySchedule: 31,
			endMonthSchedule,
			endYearSchedule,
		})
		return data as IWorkSchedule
	} catch (error: any) {
		throw error
	}
}
