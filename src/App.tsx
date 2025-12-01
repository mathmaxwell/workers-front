import { Route, Routes } from 'react-router-dom'

import Register from './pages/register/Register'
import { useThemeStore } from './theme/theme'
import { getTheme } from './theme/getTheme'
import { useMemo } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Dashboard from './pages/dashboard/Dashboard'
import { FilterModal } from './components/Modals/FilterModal'
import { ShowFieldsModal } from './components/Modals/ShowFieldsModal'
import { CreateEmployeesModal } from './components/Modals/CreateEmployeesModal'
import BasePage from './pages/BasePage/BasePage'
import EmployeesPage from './pages/employees/EmployeesPage'
import Messages from './pages/messages/Messages'
import CreateWorkScheduleModal from './components/Modals/CreateWorkScheduleModal'
import ShowEmployees from './components/Modals/ShowEmployees'
import ChangeStatus from './components/Modals/ChangeStatus'
import Schedules from './pages/Schedules/Schedules'
import UpdateSchedule from './components/Modals/UpdateSchedule'

function App() {
	const { theme } = useThemeStore()
	const muiTheme = useMemo(() => getTheme(theme), [theme])
	return (
		<>
			<ThemeProvider theme={muiTheme}>
				<CssBaseline />
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/base' element={<BasePage />} />
					<Route path='/messages' element={<Messages />} />
					<Route path='/messages/:id' element={<Messages />} />
					<Route path='/employees/:id' element={<EmployeesPage />} />
					<Route path='/schedules' element={<Schedules />} />
					<Route path='/schedules/:depId' element={<Schedules />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</ThemeProvider>
			<FilterModal />
			<ChangeStatus />
			<ShowEmployees />
			<UpdateSchedule />
			<ShowFieldsModal />
			<CreateEmployeesModal />
			<CreateWorkScheduleModal />
		</>
	)
}

export default App
