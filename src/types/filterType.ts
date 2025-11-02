export interface IFilterType {
	isOpen: boolean
	name: string
	gender: 'male' | 'female' | ''
	passport_series_and_number: string
	PINFL: string
	date_of_birth: number
	birth_month: number
	year_of_birth: number
	place_of_birth: string
	nationality: string
	department: string
	position: string
	work_schedule: string
}

export enum SelectedType {
	image = 'image',
	name = 'name',
	gender = 'gender',
	passport_series_and_number = 'passport_series_and_number',
	PINFL = 'PINFL',
	date_of_birth = 'date_of_birth',
	birth_day = 'birth_day',
	nationality = 'nationality',
	department = 'department',
	position = 'position',
	work_schedule = 'work_schedule',
}
export interface IShowType {
	isOpenModal: boolean
	sortField: SelectedType
	sortAsc: boolean // true = по возрастанию, false = по убыванию
	image: boolean
	gender: boolean
	name: boolean
	passport_series_and_number: boolean
	PINFL: boolean
	date_of_birth: boolean
	birth_month: boolean
	year_of_birth: boolean
	place_of_birth: boolean
	nationality: boolean
	department: boolean
	position: boolean
	work_schedule: boolean
}

export const months: [
	'january',
	'february',
	'march',
	'april',
	'may',
	'june',
	'july',
	'august',
	'september',
	'october',
	'november',
	'december'
] = [
	'january',
	'february',
	'march',
	'april',
	'may',
	'june',
	'july',
	'august',
	'september',
	'october',
	'november',
	'december',
]
