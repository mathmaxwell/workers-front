import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SelectedType, type IShowType } from '../../types/filterType'

interface IListState {
	filter: IShowType
	setFilter: (data: Partial<IShowType>) => void
	resetFilter: () => void
}

const initialFilter: IShowType = {
	isOpenModal: false,
	sortField: SelectedType.full_name,
	sortAsc: true,
	image: true,
	gender: false,
	full_name: true,
	passport_series_and_number: false,
	PINFL: false,
	date_of_birth: false,
	birth_month: false,
	year_of_birth: false,
	place_of_birth: false,
	nationality: false,
	department: true,
	position: true,
	work_schedule: false,
}

export const useShowListStore = create<IListState>()(
	persist(
		(set, get) => ({
			filter: { ...initialFilter },
			setFilter: data => set({ filter: { ...get().filter, ...data } }),
			resetFilter: () => set({ filter: { ...initialFilter } }),
		}),
		{
			name: 'list-filter-storage',
		}
	)
)
