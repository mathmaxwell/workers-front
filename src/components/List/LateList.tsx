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
import {
	getEmployeesById,
	getLateEmployees,
} from '../../api/employeesInfo/employeesInfo'
import { useQuery } from '@tanstack/react-query'
import type { ITardinessHistory } from '../../types/workSchedule/workSchedule'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { IEmployees } from '../../types/employees/employeesType'
import { getLostTime } from '../../functions/dataFn'
type LateEmployeeRow = {
	tardiness: ITardinessHistory
	employee: IEmployees
}
const LateList = () => {
	const { t } = useTranslationStore()
	const navigate = useNavigate()
	const { token } = useTokenStore()
	const { data: employees } = useQuery<ITardinessHistory[], Error>({
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
	const [rows, setRows] = useState<any[]>([])
	useEffect(() => {
		async function fetchEmployees() {
			if (!employees || !token) return
			const employeesInfo = await Promise.all(
				employees.map(row => getEmployeesById({ token, id: row.employeeId }))
			)
			const merged = employees.map((row, index) => ({
				...row,
				employee: employeesInfo[index],
			}))

			setRows(merged)
		}

		fetchEmployees()
	}, [employees, token])

	return (
		<>
			<Paper sx={{ width: '100%', overflow: 'auto' }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead>
							<TableRow>
								<TableCell>{t.full_name}</TableCell>
								<TableCell align='center'>{t.department}</TableCell>
								<TableCell align='right'>{t.late_time} (min)</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows?.map((row, index) => {
								const data = getLostTime(row)

								return (
									<TableRow
										hover
										role='checkbox'
										key={index}
										onClick={() => {
											navigate(`/employees/${row.employeeId}`)
										}}
									>
										<TableCell sx={{ textAlign: 'left' }}>
											{row.employee.full_name}
										</TableCell>
										<TableCell sx={{ textAlign: 'center' }}>
											{row.employee.department}
										</TableCell>
										<TableCell sx={{ textAlign: 'right', color: data.color }}>
											{-data.diff}
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
