export interface IEmployeesCount {
	terminated: number
	on_probation: number
	active_employees: number
	on_vacation: number
	on_sick_leave: number
	on_a_business_trip: number
	absence: number
	total_employees: number
}

export interface IEmployees {
	id: string
	gender: 'male' | 'female'
	mode: 'update' | 'create'
	passport_series_and_number: string
	PINFL: string
	full_name: string
	image: File | string
	department: string
	position: string
	terminated: boolean
	on_probation: boolean
	on_vacation: boolean
	on_sick_leave: boolean
	on_a_business_trip: boolean
	absence: boolean
	date_of_birth: number
	birth_month: number
	year_of_birth: number
	place_of_birth: string
	nationality: string
	Email: string
	phone_number: string
	work_schedule: string
}
