import { create } from 'zustand'
import { getCurrentMonthRange } from '../functions/dataFn'

interface DateRangeStore {
	startDate: Date
	endDate: Date
	setStartDate: (date: Date) => void
	setEndDate: (date: Date) => void
	resetToday: () => void
}

export const useDateRangeStore = create<DateRangeStore>(set => {
	const { start, end } = getCurrentMonthRange()
	return {
		startDate: start,
		endDate: end,
		setStartDate: date => set({ startDate: date }),
		setEndDate: date => set({ endDate: date }),
		resetToday: () => {
			const { start, end } = getCurrentMonthRange()
			set({ startDate: start, endDate: end })
		},
	}
})
