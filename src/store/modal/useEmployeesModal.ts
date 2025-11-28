import { create } from 'zustand'
import type { IEmployees } from '../../types/employees/employeesType'

type EmployeesWithDescription = {
	id: string
	description?: string
}

interface EmployeesModalState {
	isOpen: boolean
	ids: EmployeesWithDescription[]
	text: string
	employees: IEmployees[]
	setText: (newText: string) => void
	open: () => void
	close: () => void
	setIds: (newIds: EmployeesWithDescription[]) => void
	setemployees: (newEmp: IEmployees[]) => void
}

export const useEmployeesStore = create<EmployeesModalState>(set => ({
	isOpen: false,
	ids: [],
	text: '',
	employees: [],
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false, text: '', ids: [], employees: [] }),
	setIds: newIds => set({ ids: newIds }),
	setText: newText => set({ text: newText }),
	setemployees: newEmp => set({ employees: newEmp }),
}))
