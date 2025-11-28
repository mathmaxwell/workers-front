import { create } from 'zustand'

interface EmployeesModalState {
	isOpen: boolean
	id: string
	open: () => void
	close: () => void
	setId: (id: string) => void
}

export const useChangeStatus = create<EmployeesModalState>(set => ({
	isOpen: false,
	id: '',
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false, id: '' }),
	setId: newId => set({ id: newId }),
}))
