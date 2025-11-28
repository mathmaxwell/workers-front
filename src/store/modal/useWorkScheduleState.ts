import { create } from 'zustand'
import type { IWorkScheduleForDay } from '../../types/workSchedule/workSchedule'

interface EmployeesModalData {
	isOpen: boolean
	schedule: IWorkScheduleForDay[]
}

interface EmployeesWorkScheduleState {
	schedule: EmployeesModalData
	setSchedule: (data: Partial<EmployeesModalData>) => void
	resetSchedule: () => void
	openModal: () => void
	closeModal: () => void
}

const initialEmployee: EmployeesModalData = {
	isOpen: false,
	schedule: [],
}

export const useWorkScheduleModalStore = create<EmployeesWorkScheduleState>(
	set => ({
		schedule: initialEmployee,
		setSchedule: data =>
			set(state => ({
				schedule: { ...state.schedule, ...data },
			})),

		resetSchedule: () => set({ schedule: initialEmployee }),

		openModal: () =>
			set(state => ({
				schedule: { ...state.schedule, isOpen: true },
			})),

		closeModal: () =>
			set(state => ({
				schedule: { ...state.schedule, isOpen: false },
			})),
	})
)
