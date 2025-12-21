import type { IRecord } from '../../types/record/record'
import api from '../api'

export async function createRecord(payload: {
	employeeId: string
	image: File | string
	year: number
	month: number
	day: number
	hour: number
	minute: number
	second: number
	description: string
}): Promise<IRecord> {
	const formData = new FormData()
	Object.entries(payload).forEach(([key, value]) => {
		if (key === 'image' && value instanceof File) {
			formData.append('image', value)
		} else {
			formData.append(key, String(value))
		}
	})
	const { data } = await api.post('/record/create', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})

	return data
}
