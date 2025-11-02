import { Box } from '@mui/material'
import BaseFilter from '../../components/BasePage/BaseFilter'
import EmployeesList from '../../components/BasePage/EmployeesList'

const BasePage = () => {
	return (
		<>
			<Box
				sx={{
					width: 'calc(100vw - 310px)',
					display: 'flex',
					flexDirection: 'column',
					gap: '20px',
				}}
			>
				<BaseFilter />
				<EmployeesList />
			</Box>
		</>
	)
}

export default BasePage
