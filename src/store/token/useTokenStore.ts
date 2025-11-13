import { create } from 'zustand'

interface TokenStore {
	token: string
	setToken: (token: string) => void
	resetToken: () => void
}

export const useTokenStore = create<TokenStore>(set => ({
	token: localStorage.getItem('workersToken') || 'test',
	setToken: (token: string) => {
		localStorage.setItem('workersToken', token)
		set({ token })
	},
	resetToken: () => {
		localStorage.removeItem('workersToken')
		set({ token: '' })
	},
}))
