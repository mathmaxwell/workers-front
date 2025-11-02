import {
	Box,
	Button,
	IconButton,
	InputBase,
	Paper,
	Typography,
	useTheme,
} from '@mui/material'
import { useTranslationStore } from '../../language/useTranslationStore'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import TuneIcon from '@mui/icons-material/Tune'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import { useFilterModalStore } from '../../store/modal/useFilterModalStore'
import { useShowListStore } from '../../store/list/useListStore'
import SettingsIcon from '@mui/icons-material/Settings'
const BaseFilter = () => {
	const { setFilter, filter } = useFilterModalStore()
	const { t } = useTranslationStore()
	const theme = useTheme()
	const { setFilter: setShowFilter } = useShowListStore()
	return (
		<>
			<Box
				sx={{
					width: '100%',
					height: '85px',
					borderRadius: 2,
					bgcolor: theme.palette.background.paper,
					padding: '10px',
					border: '1px solid',
					borderColor: theme.palette.primary.main,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Typography variant='h5' sx={{ color: theme.palette.primary.main }}>
					{t.base}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '20px',
					}}
				>
					<Paper
						component='form'
						sx={{
							display: 'flex',
							alignItems: 'center',
							width: 350,
							border: '1px solid',
							borderColor: theme.palette.primary.main,
							boxShadow: 0,
						}}
					>
						<InputBase
							value={filter.name}
							onChange={e => {
								setFilter({ name: e.target.value })
							}}
							sx={{ ml: 2, flex: 1 }}
							placeholder={t.search_by_name}
						/>
						<IconButton color='primary' sx={{ p: '4px' }}>
							<ManageSearchIcon />
						</IconButton>
					</Paper>
					<Button
						onClick={() => {
							setShowFilter({ isOpenModal: true })
						}}
						variant='outlined'
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '10px',
						}}
					>
						{t.settings}
						<SettingsIcon />
					</Button>
					<Button
						onClick={() => {
							setFilter({ isOpen: true })
						}}
						variant='outlined'
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '10px',
						}}
					>
						{t.filter}
						<TuneIcon />
					</Button>
					<Button
						variant='outlined'
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '10px',
						}}
					>
						{t.add_employee}
						<PersonAddAltIcon />
					</Button>
				</Box>
			</Box>
		</>
	)
}

export default BaseFilter
