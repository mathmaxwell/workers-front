import { Box, Modal, Typography, useTheme } from '@mui/material'
import { useEmployeesStore } from '../../store/modal/useEmployeesModal'
import { getEmployeesById } from '../../api/employeesInfo/employeesInfo'
import { useTokenStore } from '../../store/token/useTokenStore'
import { useQueries } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const ShowEmployees = () => {
	const apiUrl = import.meta.env.VITE_API_URL
	const theme = useTheme()
	const { token } = useTokenStore()
	const navigate = useNavigate()
	const {
		close,
		ids,
		isOpen,
		text,
		employees: oldEmployees,
	} = useEmployeesStore()
	const results = useQueries({
		queries: ids.map(info => ({
			queryKey: ['employee', info],
			queryFn: () => getEmployeesById({ token, id: info.id }),
			enabled: isOpen && !!token,
		})),
	})
	const employees = results.filter(r => r.data).map(r => r.data)
	const allEmployees = [...employees, ...oldEmployees]

	return (
		<Modal open={isOpen} onClose={close}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 900,
					bgcolor: theme.palette.background.default,
					boxShadow: 24,
					borderRadius: 2,
					p: 3,
					border: '2px solid',
					borderColor: theme.palette.primary.main,
				}}
			>
				<Typography
					variant='h6'
					mb={2}
					sx={{ color: theme.palette.text.primary }}
				>
					{text}
				</Typography>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						gap: 1,
						maxHeight: 500,
						overflowY: 'auto',
					}}
				>
					{allEmployees.map((emp, ind) => (
						<Box
							key={ind}
							onClick={() => {
								navigate(`/employees/${emp?.id}`)
								close()
							}}
							sx={{
								p: 1,
								color: theme.palette.text.primary,
								borderRadius: 2,
								border: '1px solid',
								borderColor: theme.palette.primary.main,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 1,
							}}
						>
							{emp?.image && (
								<img
									style={{ width: '80px', height: '80px', objectFit: 'cover' }}
									src={
										typeof emp.image === 'string'
											? `${apiUrl}${emp.image}`
											: URL.createObjectURL(emp.image)
									}
									alt='image'
								/>
							)}
							<Box sx={{ width: '100%' }}>
								<Typography>{emp?.full_name}</Typography>
								<Typography>{emp?.department}</Typography>
								<Typography>{emp?.position}</Typography>
								<Typography>
									{ids.find(x => x.id === emp?.id)?.description || ''}
								</Typography>
							</Box>
						</Box>
					))}
				</Box>
			</Box>
		</Modal>
	)
}

export default ShowEmployees
