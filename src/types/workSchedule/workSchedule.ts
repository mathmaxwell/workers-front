export interface IWorkScheduleForDay {
	id: string
	EmployeeId: string
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
	employeeId: string
	day: number
	month: number
	year: number
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
	workSchedule: IWorkScheduleForDay
}
