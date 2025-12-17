import type {
	IEmployees,
	IEmployeesCount,
} from '../../types/employees/employeesType'
import type { IFilterType, IStatus, SelectedType } from '../../types/filterType'
import type { ITardinessHistory } from '../../types/workSchedule/workSchedule'
import api from '../api'
export async function createEmployees(payload: {
	token: string
	gender: 'male' | 'female'
	passport_series_and_number: string
	PINFL: string
	full_name: string
	image: File | string
	department: string
	position: string
	date_of_birth: number
	birth_month: number
	year_of_birth: number
	place_of_birth: string
	nationality: string
	Email: string
	phone_number: string
}): Promise<IEmployees> {
	const formData = new FormData()

	Object.entries(payload).forEach(([key, value]) => {
		if (key === 'image' && value instanceof File) {
			formData.append('image', value)
		} else {
			formData.append(key, String(value))
		}
	})

	const { data } = await api.post('/employees/createEmployees', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})

	return data
}
export async function updateEmployees(payload: {
	token: string
	id: string
	gender: 'male' | 'female'
	passport_series_and_number: string
	PINFL: string
	full_name: string
	image: File | string
	department: string
	position: string
	date_of_birth: number
	birth_month: number
	year_of_birth: number
	place_of_birth: string
	nationality: string
	Email: string
	phone_number: string
	accepted: boolean
}): Promise<IEmployees> {
	const formData = new FormData()

	Object.entries(payload).forEach(([key, value]) => {
		if (key === 'image' && value instanceof File) {
			formData.append('image', value)
			return
		}

		if (key === 'accepted') return

		formData.append(key, String(value))
	})

	// ⬅️ ЯВНО добавляем accepted
	formData.append('accepted', payload.accepted ? 'true' : 'false')

	const { data } = await api.post('/employees/updateEmployees', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})

	return data
}
export async function employeesCount({
	token,
	day,
	month,
	year,
}: {
	token: string
	day: number
	month: number
	year: number
}): Promise<IEmployeesCount> {
	try {
		const { data } = await api.post('/employees/getEmployeesCount', {
			token,
			day,
			month,
			year,
		})

		return data
	} catch (error) {
		throw error
	}
}
export async function getLateEmployeesById({
	token,
	id,
	startMonth,
	startYear,
	endMonth,
	endYear,
}: {
	token: string
	id: string
	startMonth: number
	startYear: number
	endMonth: number
	endYear: number
}): Promise<ITardinessHistory[]> {
	try {
		const { data } = await api.post('/employees/getLateEmployeesById', {
			token,
			id,
			startMonth,
			startYear,
			endMonth,
			endYear,
		})
		return data as ITardinessHistory[]
	} catch (error: any) {
		if (error.response) {
			throw new Error(error.response.data?.message || 'Ошибка запроса')
		} else if (error.request) {
			throw new Error('Сервер не отвечает')
		} else {
			throw new Error('Неизвестная ошибка')
		}
	}
}
export async function getLateEmployees({
	token,
	startDate,
	endDate,
}: {
	token: string
	startDate: Date
	endDate: Date
}): Promise<ITardinessHistory[]> {
	try {
		const start_day = startDate.getDate()
		const start_month = startDate.getMonth() + 1
		const start_year = startDate.getFullYear()
		const end_day = endDate.getDate()
		const end_month = endDate.getMonth() + 1
		const end_year = endDate.getFullYear()
		const { data } = await api.post('/employees/getLateEmployees', {
			token,
			start_day,
			start_month,
			start_year,
			end_day,
			end_month,
			end_year,
		})
		return data as ITardinessHistory[]
	} catch (error: any) {
		if (error.response) {
			throw new Error(error.response.data?.message || 'Ошибка запроса')
		} else if (error.request) {
			throw new Error('Сервер не отвечает')
		} else {
			throw new Error('Неизвестная ошибка')
		}
	}
}
export async function getEmployees({
	token,
	page,
	count,
	sortField,
	sortAsc,
	filter,
}: {
	token: string
	page: number
	count: number
	sortField: SelectedType
	sortAsc: boolean
	filter: IFilterType
}): Promise<IEmployees[]> {
	try {
		const { data } = await api.post('/employees/getEmployees', {
			token,
			page,
			count,
			sortField,
			sortAsc,
			gender: filter.gender,
			passport_series_and_number: filter.passport_series_and_number,
			PINFL: filter.PINFL,
			full_name: filter.full_name,
			department: filter.department,
			position: filter.position,
			date_of_birth: filter.date_of_birth,
			birth_month: filter.birth_month,
			year_of_birth: filter.year_of_birth,
			place_of_birth: filter.place_of_birth,
			nationality: filter.nationality,
		})
		return data
	} catch (error: any) {
		throw new Error('Неизвестная ошибка')
	}
}
export async function getEmployeesById({
	token,
	id,
}: {
	token: string
	id: string
}): Promise<IEmployees> {
	try {
		const { data } = await api.post('/employees/getEmployeesById', {
			token,
			id,
		})
		return data
	} catch (error: any) {
		throw new Error('Неизвестная ошибка')
	}
}
export async function getEmployeesByStatus({
	token,
	status,
	day,
	month,
	year,
}: {
	token: string
	status:
		| 'active_employees'
		| 'on_vacation'
		| 'on_sick_leave'
		| 'on_a_business_trip'
		| 'absence'
		| 'total_employees'
	day: number
	month: number
	year: number
}): Promise<string[]> {
	try {
		const { data } = await api.post('/employees/getEmployeesByStatus', {
			token,
			status,
			day,
			month,
			year,
		})
		return data
	} catch (error: any) {
		throw new Error('Неизвестная ошибка')
	}
}
export async function getStatusById({
	token,
	id,
}: {
	token: string
	id: string
}): Promise<IStatus[]> {
	try {
		const { data } = await api.post('/employees/getStatusById', {
			token,
			id,
		})
		return data
	} catch (error: any) {
		throw new Error('Неизвестная ошибка')
	}
}
export async function createStatus({
	token,
	EmployeeId,
	startDay,
	startMonth,
	startYear,
	endDay,
	endMonth,
	endYear,
	status,
}: {
	token: string
	EmployeeId: string
	startDay: number
	startMonth: number
	startYear: number
	endDay: number
	endMonth: number
	endYear: number
	status: 'on_vacation' | 'on_sick_leave' | 'on_a_business_trip'
}): Promise<IStatus> {
	try {
		const { data } = await api.post('/employees/createStatus', {
			token,
			EmployeeId,
			startDay,
			startMonth,
			startYear,
			endDay,
			endMonth,
			endYear,
			status,
		})
		return data as IStatus
	} catch (error: any) {
		throw new Error('Неизвестная ошибка')
	}
}
export async function deleteEmployee({
	token,
	id,
}: {
	token: string
	id: string
}): Promise<any> {
	try {
		const { data } = await api.post('/employees/deleteEmployee', {
			token,
			id,
		})
		return data
	} catch (error: any) {
		throw new Error('Неизвестная ошибка')
	}
}
