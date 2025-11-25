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
		return result.data
	} catch (error: any) {
		if (error.response) {
			return { error: error.response.data }
		} else if (error.request) {
			return { error: 'Сервер не отвечает' }
		} else {
			return { error: 'Неизвестная ошибка' }
		}
	}
}
