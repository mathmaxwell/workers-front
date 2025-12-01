import type { IWorkScheduleForDay } from '../types/workSchedule/workSchedule'
export const dayIds = [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday',
] as const
export type DayId = (typeof dayIds)[number]

export const createHoliday = (id: DayId): IWorkScheduleForDay => ({
	id,
	startHour: 99,
	startDay: 1,
	startMonth: 1,
	startYear: 2025,
	endHour: 99,
	endDay: 1,
	endMonth: 1,
	endYear: 2025,
})

export const defaultSchedule: IWorkScheduleForDay[] = [
	{
		id: 'monday',
		startHour: 9,
		startDay: 1,
		startMonth: 1,
		startYear: 2025,
		endHour: 18,
		endDay: 1,
		endMonth: 1,
		endYear: 2025,
	},
	{
		id: 'tuesday',
		startHour: 9,
		startDay: 1,
		startMonth: 1,
		startYear: 2025,
		endHour: 18,
		endDay: 1,
		endMonth: 1,
		endYear: 2025,
	},
	{
		id: 'wednesday',
		startHour: 9,
		startDay: 1,
		startMonth: 1,
		startYear: 2025,
		endHour: 18,
		endDay: 1,
		endMonth: 1,
		endYear: 2025,
	},
	{
		id: 'thursday',
		startHour: 9,
		startDay: 1,
		startMonth: 1,
		startYear: 2025,
		endHour: 18,
		endDay: 1,
		endMonth: 1,
		endYear: 2025,
	},
	{
		id: 'friday',
		startHour: 9,
		startDay: 1,
		startMonth: 1,
		startYear: 2025,
		endHour: 18,
		endDay: 1,
		endMonth: 1,
		endYear: 2025,
	},
	{
		id: 'saturday',
		startHour: 10,
		startDay: 1,
		startMonth: 1,
		startYear: 2025,
		endHour: 17,
		endDay: 1,
		endMonth: 1,
		endYear: 2025,
	},
	createHoliday('sunday'),
]
export const isHoliday = (day: IWorkScheduleForDay) =>
	day.startHour === 0 && day.endHour === 0
export const formatTime = (day: IWorkScheduleForDay) => {
	if (isHoliday(day)) return null
	if (day.endHour > 24) {
		return `${String(day.startHour).padStart(2, '0')}:00 – ${String(
			day.endHour - 24
		).padStart(2, '0')}:00`
	}
	return `${String(day.startHour).padStart(2, '0')}:00 – ${String(
		day.endHour
	).padStart(2, '0')}:00`
}
