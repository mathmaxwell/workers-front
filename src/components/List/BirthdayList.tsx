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
import { getBirthdaysThisMonth } from '../../api/employeesInfo/employeesInfo'
import { months } from '../../types/filterType'
const BirthdayList = () => {
	const { token } = useTokenStore()
	const { data: employeesCountInfo } = useQuery<IEmployees[], Error>({
		queryKey: ['employeesCountInfo', token],
		queryFn: async () => {
			const result = await getBirthdaysThisMonth({ token })
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
							{employeesCountInfo?.map((row, index) => {
								return (
									<TableRow hover role='checkbox' tabIndex={-1} key={index}>
										<TableCell sx={{ textAlign: 'left' }}>
											{row.fullName}
										</TableCell>
										<TableCell sx={{ textAlign: 'center' }}>
											{row.department}
										</TableCell>
										<TableCell sx={{ textAlign: 'right' }}>
											{row.date_of_birth}-{t[months[row.birth_month]]}
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
