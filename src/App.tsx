import { Route, Routes } from 'react-router-dom'

import Register from './pages/register/Register'
import { useThemeStore } from './theme/theme'
import { getTheme } from './theme/getTheme'
import { useMemo } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Dashboard from './pages/dashboard/Dashboard'
import { FilterModal } from './components/Modals/FilterModal'
import { ShowFieldsModal } from './components/Modals/ShowFieldsModal'

function App() {
	const { theme } = useThemeStore()
	const muiTheme = useMemo(() => getTheme(theme), [theme])
	return (
		<>
			<ThemeProvider theme={muiTheme}>
				<CssBaseline />
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='/:id' element={<Dashboard />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</ThemeProvider>
			<FilterModal />
			<ShowFieldsModal />
		</>
	)
}

export default App
