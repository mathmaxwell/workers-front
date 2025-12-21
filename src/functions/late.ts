import type { ITardinessHistory } from '../types/workSchedule/workSchedule'

export function clearingDate(data: ITardinessHistory[] = []): ITardinessHistory[] {
	return data.filter(item => {
		const { workSchedule } = item
		if (!workSchedule) return false
		const entryTime = new Date(
			item.entryYear,
			item.entryMonth - 1,
			item.entryDay,
			item.entryHour,
			item.entryMinute
		).getTime()
		const exitTime = new Date(
			item.exitYear,
			item.exitMonth - 1,
			item.exitDay,
			item.exitHour,
			item.exitMinute
		).getTime()
		const startTime = new Date(
			workSchedule.startYear,
			workSchedule.startMonth - 1,
			workSchedule.startDay,
			workSchedule.startHour,
			0
		).getTime()
		const endTime = new Date(
			workSchedule.endYear,
			workSchedule.endMonth - 1,
			workSchedule.endDay,
			workSchedule.endHour,
			0
		).getTime()
		return entryTime > startTime || exitTime < endTime
	})
}
