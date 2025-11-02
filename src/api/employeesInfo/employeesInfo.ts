import type {
	IEmployees,
	IEmployeesCount,
	IEmployeesLate,
} from '../../types/employees/employeesType'
import type { SelectedType } from '../../types/filterType'
import api from '../api'

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
		const { data } = await api.post('/employees/count', {
			token,
			day,
			month,
			year,
		})
		return data
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

export async function getBirthdaysThisMonth({
	token,
}: {
	token: string
}): Promise<IEmployees[]> {
	try {
		const now = new Date()
		const day = now.getDate()
		const month = now.getMonth() + 1
		const year = now.getFullYear()
		const { data } = await api.post('/employees/getEmployees', {
			token,
			date_of_birth: day,
			birth_month: month,
			year_of_birth: year,
		})
		return data
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
}): Promise<IEmployeesLate[]> {
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
		return data
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
}: {
	token: string
	page: number
	count: number
	sortField: SelectedType
	sortAsc: boolean
}): Promise<IEmployees[]> {
	try {
		const { data } = await api.post('/employees/getEmployees', {
			token,
			page,
			count,
			sortField,
			sortAsc,
		})
		return data
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
