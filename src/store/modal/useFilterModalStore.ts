import { create } from 'zustand'
import type { IFilterType } from '../../types/filterType'

interface FilterModalState {
	filter: IFilterType
	setFilter: (data: Partial<IFilterType>) => void
	resetFilter: () => void
	openModal: () => void
	closeModal: () => void
}

const initialFilter: IFilterType = {
	isOpen: false,
	gender: '',
	full_name: '',
	passport_series_and_number: '',
	PINFL: '',
	date_of_birth: 0,
	birth_month: 0,
	year_of_birth: 0,
	place_of_birth: '',
	nationality: '',
	department: '',
	position: '',
	work_schedule: '',
}

export const useFilterModalStore = create<FilterModalState>(set => ({
	filter: initialFilter,
	setFilter: data =>
		set(state => ({
			filter: { ...state.filter, ...data },
		})),
	resetFilter: () => set({ filter: initialFilter }),
	openModal: () =>
		set(state => ({ filter: { ...state.filter, isOpen: true } })),
	closeModal: () =>
		set(state => ({ filter: { ...state.filter, isOpen: false } })),
}))
