import {
	Avatar,
	Box,
	ListItem,
	ListItemAvatar,
	ListItemText,
	useTheme,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import type { IDepartment } from '../../types/department/departmentType'
import { useTokenStore } from '../../store/token/useTokenStore'
import { getDepartment } from '../../api/deportament/deportament'
import Line from '../../components/Line'
import { useEffect } from 'react'
import { useFilterModalStore } from '../../store/modal/useFilterModalStore'

const SelectDepartament = () => {
	const theme = useTheme()
	const { token } = useTokenStore()
	const navigate = useNavigate()
	const { setFilter, resetFilter } = useFilterModalStore()
	useEffect(() => {
		resetFilter()
	}, [])
	const { data: department } = useQuery<IDepartment[]>({
		queryKey: ['department', token],
		queryFn: async () => {
			const result = await getDepartment({ token })
			return result || []
		},
		enabled: !!token,
	})
	return (
		<>
			<Box
				sx={{
					height: '100%',
					width: '50%',
					bgcolor: theme.palette.background.default,
					borderRadius: 2,
					border: '1px solid',
					borderColor: theme.palette.primary.main,
					overflowY: 'auto',
				}}
			>
				{department?.map((dep, ind) => (
					<Box key={ind}>
						<ListItem
							onClick={() => {
								setFilter({ department: dep.name })
								navigate(`/schedules/${dep.id}`)
							}}
							key={1}
							disablePadding
							sx={{ p: 1, cursor: 'pointer', height: '60px' }}
						>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									width: '100%',
								}}
							>
								<ListItemAvatar>
									<Avatar>{dep.name[0]}</Avatar>
								</ListItemAvatar>
								<ListItemText primary={dep.name} sx={{ textWrap: 'nowrap' }} />
							</Box>
						</ListItem>
						<Line />
					</Box>
				))}
			</Box>
		</>
	)
}

export default SelectDepartament
