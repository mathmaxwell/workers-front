import { create } from 'zustand'

interface TokenStore {
	token: string
	userRole: string
	setUserRole: (userRole: string) => void
	setToken: (token: string) => void
	resetToken: () => void
}
export const useTokenStore = create<TokenStore>(set => ({
	token: localStorage.getItem('workersToken') || '',
	userRole: localStorage.getItem('workersUserRole') || '',
	setToken: (token: string) => {
		localStorage.setItem('workersToken', token)
		set({ token })
	},
	setUserRole: (userRole: string) => {
		localStorage.setItem('workersUserRole', userRole)
		set({ userRole })
	},
	resetToken: () => {
		localStorage.removeItem('workersToken')
		localStorage.removeItem('workersUserRole')
		set({ token: '', userRole: '' })
	},
}))
