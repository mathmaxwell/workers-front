import type {
	IEmployees,
	IEmployeesCount,
} from '../../types/employees/employeesType'
import type { SelectedType } from '../../types/filterType'
import type { ITardinessHistory } from '../../types/workSchedule/workSchedule'
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
	} catch (error) {
		return {
			terminated: 1,
			on_probation: 2,
			active_employees: 15,
			on_vacation: 4,
			on_sick_leave: 5,
			on_a_business_trip: 2,
			absence: 3,
			total_employees: 32,
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
		return data
	} catch (error: any) {
		if (error.response) {
			throw new Error(error.response.data?.message || 'Ошибка запроса')
		} else if (error.request) {
			return []
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
		return [
			{
				id: '1',
				gender: 'male',
				passport_series_and_number: 'AA1234567',
				PINFL: '12345678901234',
				full_name: 'Abdurahim Karimov',
				image: '/images/employees/1.jpg',
				department: 'Engineering',
				position: 'Backend Developer',
				terminated: false,
				on_probation: false,
				on_vacation: false,
				on_sick_leave: false,
				on_a_business_trip: false,
				absence: false,
				date_of_birth: 15,
				birth_month: 6,
				year_of_birth: 1998,
				place_of_birth: 'Tashkent',
				nationality: 'Uzbek',
				Email: 'abdurahim.karimov@example.com',
				phone_number: '+998901112233',
				work_schedule: 'full_time',
			},

			{
				id: '2',
				gender: 'female',
				passport_series_and_number: 'AB9876543',
				PINFL: '98765432101234',
				full_name: 'Dilnoza Rakhimova',
				image: '/images/employees/2.jpg',
				department: 'HR',
				position: 'HR Manager',
				terminated: false,
				on_probation: false,
				on_vacation: true,
				on_sick_leave: false,
				on_a_business_trip: false,
				absence: false,
				date_of_birth: 21,
				birth_month: 3,
				year_of_birth: 1995,
				place_of_birth: 'Samarkand',
				nationality: 'Uzbek',
				Email: 'dilnoza.rakhimova@example.com',
				phone_number: '+998935556677',
				work_schedule: 'remote',
			},

			{
				id: '3',
				gender: 'male',
				passport_series_and_number: 'AC3456789',
				PINFL: '34567890123456',
				full_name: 'Bekzod Tursunov',
				image: '/images/employees/3.jpg',
				department: 'IT Support',
				position: 'System Administrator',
				terminated: false,
				on_probation: true,
				on_vacation: false,
				on_sick_leave: false,
				on_a_business_trip: false,
				absence: false,
				date_of_birth: 4,
				birth_month: 11,
				year_of_birth: 2000,
				place_of_birth: 'Fergana',
				nationality: 'Uzbek',
				Email: 'bekzod.tursunov@example.com',
				phone_number: '+998909998877',
				work_schedule: 'shift',
			},

			{
				id: '4',
				gender: 'female',
				passport_series_and_number: 'AD1122334',
				PINFL: '56789012345678',
				full_name: 'Malika Usmonova',
				image: '/images/employees/4.jpg',
				department: 'Finance',
				position: 'Accountant',
				terminated: false,
				on_probation: false,
				on_vacation: false,
				on_sick_leave: true,
				on_a_business_trip: false,
				absence: false,
				date_of_birth: 30,
				birth_month: 1,
				year_of_birth: 1992,
				place_of_birth: 'Bukhara',
				nationality: 'Uzbek',
				Email: 'malika.usmonova@example.com',
				phone_number: '+998971234567',
				work_schedule: 'universal',
			},

			{
				id: '5',
				gender: 'male',
				passport_series_and_number: 'AE5566778',
				PINFL: '67890123456789',
				full_name: 'Javlonbek Sharipov',
				image: '/images/employees/5.jpg',
				department: 'Sales',
				position: 'Sales Manager',
				terminated: false,
				on_probation: false,
				on_vacation: false,
				on_sick_leave: false,
				on_a_business_trip: true,
				absence: false,
				date_of_birth: 9,
				birth_month: 9,
				year_of_birth: 1990,
				place_of_birth: 'Namangan',
				nationality: 'Uzbek',
				Email: 'javlonbek.sharipov@example.com',
				phone_number: '+998933334455',
				work_schedule: 'full_time',
			},
			{
				id: '1',
				gender: 'male',
				passport_series_and_number: 'AA1234567',
				PINFL: '12345678901234',
				full_name: 'Abdurahim Karimov',
				image: '/images/employees/1.jpg',
				department: 'Engineering',
				position: 'Backend Developer',
				terminated: false,
				on_probation: false,
				on_vacation: false,
				on_sick_leave: false,
				on_a_business_trip: false,
				absence: false,
				date_of_birth: 15,
				birth_month: 6,
				year_of_birth: 1998,
				place_of_birth: 'Tashkent',
				nationality: 'Uzbek',
				Email: 'abdurahim.karimov@example.com',
				phone_number: '+998901112233',
				work_schedule: 'full_time',
			},

			{
				id: '2',
				gender: 'female',
				passport_series_and_number: 'AB9876543',
				PINFL: '98765432101234',
				full_name: 'Dilnoza Rakhimova',
				image: '/images/employees/2.jpg',
				department: 'HR',
				position: 'HR Manager',
				terminated: false,
				on_probation: false,
				on_vacation: true,
				on_sick_leave: false,
				on_a_business_trip: false,
				absence: false,
				date_of_birth: 21,
				birth_month: 3,
				year_of_birth: 1995,
				place_of_birth: 'Samarkand',
				nationality: 'Uzbek',
				Email: 'dilnoza.rakhimova@example.com',
				phone_number: '+998935556677',
				work_schedule: 'remote',
			},

			{
				id: '3',
				gender: 'male',
				passport_series_and_number: 'AC3456789',
				PINFL: '34567890123456',
				full_name: 'Bekzod Tursunov',
				image: '/images/employees/3.jpg',
				department: 'IT Support',
				position: 'System Administrator',
				terminated: false,
				on_probation: true,
				on_vacation: false,
				on_sick_leave: false,
				on_a_business_trip: false,
				absence: false,
				date_of_birth: 4,
				birth_month: 11,
				year_of_birth: 2000,
				place_of_birth: 'Fergana',
				nationality: 'Uzbek',
				Email: 'bekzod.tursunov@example.com',
				phone_number: '+998909998877',
				work_schedule: 'shift',
			},

			{
				id: '4',
				gender: 'female',
				passport_series_and_number: 'AD1122334',
				PINFL: '56789012345678',
				full_name: 'Malika Usmonova',
				image: '/images/employees/4.jpg',
				department: 'Finance',
				position: 'Accountant',
				terminated: false,
				on_probation: false,
				on_vacation: false,
				on_sick_leave: true,
				on_a_business_trip: false,
				absence: false,
				date_of_birth: 30,
				birth_month: 1,
				year_of_birth: 1992,
				place_of_birth: 'Bukhara',
				nationality: 'Uzbek',
				Email: 'malika.usmonova@example.com',
				phone_number: '+998971234567',
				work_schedule: 'universal',
			},

			{
				id: '5',
				gender: 'male',
				passport_series_and_number: 'AE5566778',
				PINFL: '67890123456789',
				full_name: 'Javlonbek Sharipov',
				image: '/images/employees/5.jpg',
				department: 'Sales',
				position: 'Sales Manager',
				terminated: false,
				on_probation: false,
				on_vacation: false,
				on_sick_leave: false,
				on_a_business_trip: true,
				absence: false,
				date_of_birth: 9,
				birth_month: 9,
				year_of_birth: 1990,
				place_of_birth: 'Namangan',
				nationality: 'Uzbek',
				Email: 'javlonbek.sharipov@example.com',
				phone_number: '+998933334455',
				work_schedule: 'full_time',
			},
		]
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
		return {
			id: '1',
			gender: 'male',
			passport_series_and_number: 'AA1234567',
			PINFL: '12345678901234',
			full_name: 'Abdurahim Karimov',
			image: '/images/employees/1.jpg',
			department: 'Engineering',
			position: 'Backend Developer',
			terminated: false,
			on_probation: false,
			on_vacation: false,
			on_sick_leave: false,
			on_a_business_trip: false,
			absence: false,
			date_of_birth: 15,
			birth_month: 6,
			year_of_birth: 1998,
			place_of_birth: 'Tashkent',
			nationality: 'Uzbek',
			Email: 'abdurahim.karimov@example.com',
			phone_number: '+998 90 111-22-33',
			work_schedule: 'full_time',
		}
	}
}
export async function getEmployeesCount({
	token,
}: {
	token: string
}): Promise<number> {
	try {
		const { data } = await api.post('/employees/getEmployeesCount', {
			token,
		})
		return data as number
	} catch (error: any) {
		return 100
	}
}
