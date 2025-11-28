import { Box, Button, ButtonGroup, useTheme } from '@mui/material'
import SiteBar from '../../components/SiteBar'
import { useNavigate, useParams } from 'react-router-dom'
import type { IEmployees } from '../../types/employees/employeesType'
import { useQuery } from '@tanstack/react-query'
import { useTokenStore } from '../../store/token/useTokenStore'
import { getEmployeesById } from '../../api/employeesInfo/employeesInfo'
import Loading from '../../components/Loading/Loading'
import { useTranslationStore } from '../../language/useTranslationStore'

import ReadOnlyTexField from '../../components/textField/ReadOnlyTexField'
import { useState } from 'react'

import ShowWorkSchedule from '../../components/workSchedule/ShowWorkSchedule'
import ShowTardinessHistory from '../../components/history/ShowTardinessHistory'
import ShowCorrespondence from '../../components/correspondence/ShowCorrespondence'
import { useEmployeesModalStore } from '../../store/modal/useCreateEmployeesModal'
import { useChangeStatus } from '../../store/modal/useChangeStatus'

const EmployeesPage = () => {
	const { open, setId } = useChangeStatus()
	const { setEmployee, openModal } = useEmployeesModalStore()
	const [showElement, setShowElement] = useState<
		| 'full_information'
		| 'work_schedule'
		| 'tardiness_history'
		| 'correspondence'
	>('full_information')
	const { t } = useTranslationStore()
	const theme = useTheme()
	const { token } = useTokenStore()
	const { id } = useParams()
	const navigate = useNavigate()
	const { data: Employee } = useQuery<IEmployees, Error>({
		queryKey: ['EmployeeById', token, id],
		queryFn: async () => {
			if (!id) {
				navigate('/base')
				throw new Error('No id provided')
			}
			const result = await getEmployeesById({
				token,
				id,
			})
			return result
		},
		enabled: !!token && !!id,
	})

	const status = Employee?.on_sick_leave
		? t.on_sick_leave
		: Employee?.on_a_business_trip
		? t.on_a_business_trip
		: Employee?.on_probation
		? t.on_probation
		: t.at_work
	return (
		<>
			<Box
				sx={{
					position: 'relative',
					height: '100vh',
					width: '100vw',
					p: '20px',
					bgcolor: theme.palette.background.default,
					display: 'flex',
					alignItems: 'start',
					justifyContent: 'start',
					gap: '20px',
				}}
			>
				<SiteBar />
				{Employee ? (
					<Box
						sx={{
							width: 'calc(100vw - 310px)',
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							gap: '20px',
							bgcolor: theme.palette.background.paper,
							borderRadius: 2,
							border: '1px solid',
							borderColor: theme.palette.primary.main,
							p: 1,
						}}
					>
						{/* image */}
						<Box
							sx={{
								width: '100%',
								height: '30vh',
								display: 'flex',
								alignContent: 'center',
								justifyContent: 'space-between',
								gap: 1,
							}}
						>
							<img
								src={
									typeof Employee.image === 'string'
										? Employee.image
										: URL.createObjectURL(Employee.image)
								}
								alt='image'
								style={{
									backgroundColor: 'red',
									width: '300px',
									height: '100%',
									borderRadius: '12px',
									objectFit: 'cover',
								}}
							/>
							<Box
								sx={{
									width: '100%',
									height: '100%',
									display: 'grid',
									gridTemplateColumns: 'repeat(2, 1fr)',
									p: 1,
									gap: 1,
								}}
							>
								<ReadOnlyTexField
									label={t.full_name}
									textField={Employee.full_name}
								/>
								<ReadOnlyTexField
									label={t.phone_number}
									textField={Employee.phone_number}
								/>
								<ReadOnlyTexField
									label={t.department}
									textField={Employee.department}
								/>
								<ReadOnlyTexField
									label={t.position}
									textField={Employee.position}
								/>
								<ReadOnlyTexField
									label={t.nationality}
									textField={Employee.nationality}
								/>
								<ReadOnlyTexField
									label={t.gender}
									textField={t[Employee.gender]}
								/>
							</Box>
						</Box>
						<ButtonGroup variant='outlined'>
							<Button
								variant={
									showElement === 'full_information' ? 'contained' : 'outlined'
								}
								sx={{
									color: showElement === 'full_information' ? 'black' : 'white',
								}}
								onClick={() => {
									setShowElement('full_information')
								}}
							>
								{t.full_information}
							</Button>
							<Button
								variant={
									showElement === 'work_schedule' ? 'contained' : 'outlined'
								}
								sx={{
									color: showElement === 'work_schedule' ? 'black' : 'white',
								}}
								onClick={() => {
									setShowElement('work_schedule')
								}}
							>
								{t.work_schedule}
							</Button>
							<Button
								variant={
									showElement === 'tardiness_history' ? 'contained' : 'outlined'
								}
								sx={{
									color:
										showElement === 'tardiness_history' ? 'black' : 'white',
								}}
								onClick={() => {
									setShowElement('tardiness_history')
								}}
							>
								{t.tardiness_history}
							</Button>
							<Button
								variant={
									showElement === 'correspondence' ? 'contained' : 'outlined'
								}
								sx={{
									color: showElement === 'correspondence' ? 'black' : 'white',
								}}
								onClick={() => {
									setShowElement('correspondence')
								}}
							>
								{t.correspondence}
							</Button>
						</ButtonGroup>
						{/* information */}
						<Box sx={{ height: '54vh' }}>
							{showElement === 'full_information' ? (
								<Box
									sx={{
										display: 'grid',
										gridTemplateColumns: 'repeat(2, 1fr)',
										gap: 2,
									}}
								>
									<ReadOnlyTexField
										label={t.passport_series_and_number}
										textField={Employee.passport_series_and_number}
									/>
									<ReadOnlyTexField
										label={t.PINFL}
										textField={Employee.PINFL}
									/>
									<ReadOnlyTexField
										label={t.place_of_birth}
										textField={Employee.place_of_birth}
									/>
									<ReadOnlyTexField
										label={t.Email}
										textField={Employee.Email}
									/>
									<ReadOnlyTexField
										label={t.date_of_birth}
										textField={`${Employee.date_of_birth
											.toString()
											.padStart(2, '0')}.${Employee.birth_month
											.toString()
											.padStart(2, '0')}.${Employee.year_of_birth}`}
									/>
									<ReadOnlyTexField label={t.status} textField={status} />
									<Button
										onClick={() => {
											openModal()
											setEmployee({
												mode: 'update',
												full_name: Employee.full_name,
												passport_series_and_number:
													Employee.passport_series_and_number,
												PINFL: Employee.PINFL,
												image: Employee.image,
												date_of_birth: Employee.date_of_birth,
												birth_month: Employee.birth_month,
												year_of_birth: Employee.year_of_birth,
												gender: Employee.gender,
												phone_number: Employee.phone_number,
												Email: Employee.Email,
												place_of_birth: Employee.place_of_birth,
												nationality: Employee.nationality,
												department: Employee.department,
												id: Employee.id,
												position: Employee.position,
											})
										}}
										variant='outlined'
									>
										{t.edit}
									</Button>
									<Button
										variant='outlined'
										onClick={() => {
											open()
											setId(Employee.id)
										}}
									>
										{t.change_status}
									</Button>
								</Box>
							) : showElement === 'correspondence' ? (
								<ShowCorrespondence id={id || ''} />
							) : showElement == 'tardiness_history' ? (
								<ShowTardinessHistory id={id || ''} />
							) : (
								<ShowWorkSchedule id={id || ''} />
							)}
						</Box>
					</Box>
				) : (
					<Loading />
				)}
			</Box>
		</>
	)
}

export default EmployeesPage
