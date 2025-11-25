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
import { useQuery } from '@tanstack/react-query'
import type { IEmployees } from '../../types/employees/employeesType'

import { months, SelectedType } from '../../types/filterType'
import { getEmployees } from '../../api/employeesInfo/employeesInfo'
const BirthdayList = () => {
	const { token } = useTokenStore()
	const { data: employeesBirthday } = useQuery<IEmployees[], Error>({
		queryKey: ['employeesBirthday', token],
		queryFn: async () => {
			const now = new Date()
			const result = await getEmployees({
				token,
				page: 1,
				count: 10,
				sortField: SelectedType.date_of_birth,
				sortAsc: true,
				filter: {
					isOpen: false,
					full_name: '',
					gender: '',
					passport_series_and_number: '',
					PINFL: '',
					date_of_birth: 0,
					birth_month: now.getMonth() + 1,
					year_of_birth: 0,
					place_of_birth: '',
					nationality: '',
					department: '',
					position: '',
					work_schedule: '',
				},
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
								<TableCell>{t.birthday}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{employeesBirthday?.map((row, index) => {
								return (
									<TableRow hover role='checkbox' tabIndex={-1} key={index}>
										<TableCell sx={{ textAlign: 'left' }}>
											{row.full_name}
										</TableCell>
										<TableCell sx={{ textAlign: 'center' }}>
											{row.department}
										</TableCell>
										<TableCell sx={{ textAlign: 'right' }}>
											{row.date_of_birth}-{t[months[row.birth_month - 1]]}
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

export default BirthdayList
