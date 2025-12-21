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

export async function createUser({
	login,
	password,
	userId,
}: {
	login: string
	password: string
	userId: string
}) {
	try {
		const result = await api.post('/users/createUser', {
			login,
			password,
			userId,
		})
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

export async function updateUser({
	login,
	password,
	userId,
	userRole,
}: {
	login: string
	password: string
	userId: string
	userRole: number
}) {
	try {
		const result = await api.post('/users/updateUser', {
			login,
			password,
			userId,
			userRole,
		})
		return result.data as IUser
	} catch (error) {
		throw error
	}
}
