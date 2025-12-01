import { create } from 'zustand'
import type { IEmployees } from '../../types/employees/employeesType'

interface EmployeeModalStore {
	selectedEmployees: IEmployees[]
	isOpen: boolean
	openModal: () => void
	closeModal: () => void
	setSelectedEmployees: (employees: IEmployees[]) => void
}
export const useEmployeesSchedule = create<EmployeeModalStore>(set => ({
	selectedEmployees: [],
	isOpen: false,

	openModal: () =>
		set({
			isOpen: true,
		}),

	closeModal: () =>
		set({
			selectedEmployees: [],
			isOpen: false,
		}),

	setSelectedEmployees: employees =>
		set({
			selectedEmployees: employees,
		}),
}))
