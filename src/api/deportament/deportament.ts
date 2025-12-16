import type { IDepartment } from '../../types/department/departmentType'
import api from '../api'
export async function getDepartment({
	token,
}: {
	token: string
}): Promise<IDepartment[]> {
	try {
		const { data } = await api.post('/department/getDepartment', {
			token,
		})
		return data as IDepartment[]
	} catch (error) {
		return []
	}
}
export async function createDepartment({
	token,
	name,
}: {
	token: string
	name: string
}): Promise<IDepartment> {
	try {
		const { data } = await api.post('/department/createDepartment', {
			token,
			name,
		})
		return data as IDepartment
	} catch (error) {
		throw error
	}
}
