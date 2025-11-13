export interface IWorkScheduleForDay {
	startHour: number
	startDay: number
	startMonth: number
	startYear: number
	endHour: number
	endDay: number
	endMonth: number
	endYear: number
}
export interface IWorkSchedule {
	startDay: number
	startMonth: number
	startYear: number
	endDay: number
	endMonth: number
	endYear: number
	workSchedule: IWorkScheduleForDay[]
}
export interface ITardinessHistory {
	lateTime: number
	date: Date
	fullName: string
	department: string
	day: string
	month: string
	year: string
	workSchedule: IWorkScheduleForDay
	entryHour: number
	entryMinute: number
	entryDay: number
	entryMonth: number
	entryYear: number
	exitHour: number
	exitMinute: number
	exitDay: number
	exitMonth: number
	exitYear: number
}
