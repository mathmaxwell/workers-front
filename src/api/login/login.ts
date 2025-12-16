import type { IUser } from '../../types/employees/employeesType'
import api from '../api'

export async function login({
	login,
	password,
}: {
	login: string
	password: string
}) {
	try {
		const result = await api.post('/users/login', { login, password })
		return result.data as IUser
	} catch (error) {
		throw error
	}
}
export async function register({
	login,
	password,
}: {
	login: string
	password: string
}) {
	try {
		const result = await api.post('/users/register', { login, password })
		return result.data as IUser
	} catch (error) {
		throw error
	}
}
export async function deleteUser({
	token,
	userId,
}: {
	token: string
	userId: string
}) {
	try {
		const result = await api.post('/users/deleteUser', { token, userId })
		return result.data as IUser
	} catch (error) {
		throw error
	}
}
