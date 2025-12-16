import { create } from 'zustand'
import type { IEmployees } from '../../types/employees/employeesType'
interface EmployeesModalState {
	employee: IEmployees & { isOpen: boolean }
	setEmployee: (data: Partial<IEmployees>) => void
	resetEmployee: () => void
	openModal: () => void
	closeModal: () => void
}
const initialEmployee: IEmployees & { isOpen: boolean } = {
	isOpen: false,
	mode: 'update',
	id: '',
	full_name: '',
	image: '',
	gender: 'male',
	department: '',
	position: '',
	on_vacation: false,
	on_sick_leave: false,
	on_a_business_trip: false,
	absence: false,
	date_of_birth: 0,
	birth_month: 0,
	year_of_birth: 0,
	place_of_birth: '',
	nationality: '',
	Email: '',
	phone_number: '',
	work_schedule: '',
	passport_series_and_number: '',
	PINFL: '',
	accepted: false,
}

export const useEmployeesModalStore = create<EmployeesModalState>(set => ({
	employee: initialEmployee,
	setEmployee: data =>
		set(state => ({
			employee: { ...state.employee, ...data },
		})),
	resetEmployee: () => set({ employee: initialEmployee }),
	openModal: () =>
		set(state => ({ employee: { ...state.employee, isOpen: true } })),
	closeModal: () =>
		set(state => ({ employee: { ...state.employee, isOpen: false } })),
}))
