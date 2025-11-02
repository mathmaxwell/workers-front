import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { useTranslationStore } from '../../language/useTranslationStore'
import { useTokenStore } from '../../store/token/useTokenStore'
import { getLateEmployees } from '../../api/employeesInfo/employeesInfo'
import type { IEmployeesLate } from '../../types/employees/employeesType'
import { useQuery } from '@tanstack/react-query'

const LateList = () => {
	const { token } = useTokenStore()
	const { data: employees } = useQuery<IEmployeesLate[], Error>({
		queryKey: ['employeesCountInfo', token],
		queryFn: async () => {
			const now = new Date()
			const result = await getLateEmployees({
				token,
				startDate: now,
				endDate: now,
			})
			return result || []
		},
		enabled: !!token,
	})
	const { t } = useTranslationStore()
	return (
		<>
			<Paper sx={{ width: '100%', overflow: 'auto' }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead>
							<TableRow>
								<TableCell>{t.full_name}</TableCell>
								<TableCell align='center'>{t.department}</TableCell>
								<TableCell>{t.late_time}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{employees?.map((row, index) => {
								return (
									<TableRow hover role='checkbox' key={index}>
										<TableCell sx={{ textAlign: 'left' }}>
											{row.fullName}
										</TableCell>
										<TableCell sx={{ textAlign: 'center' }}>
											{row.department}
										</TableCell>
										<TableCell sx={{ textAlign: 'right' }}>
											{row.lateTime}
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</>
	)
}

export default LateList
