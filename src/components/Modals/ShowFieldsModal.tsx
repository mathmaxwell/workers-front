import {
	Box,
	FormControlLabel,
	FormGroup,
	Modal,
	Switch,
	Typography,
	useTheme,
} from '@mui/material'

import { useTranslationStore } from '../../language/useTranslationStore'
import { useShowListStore } from '../../store/list/useListStore'
import { SelectedType } from '../../types/filterType'

export const ShowFieldsModal = () => {
	const theme = useTheme()
	const { t } = useTranslationStore()
	const { filter, setFilter } = useShowListStore()
	const columns: {
		key: SelectedType
		label: string
		visible: boolean
	}[] = [
		{ key: SelectedType.name, label: t.full_name, visible: filter.name },
		{ key: SelectedType.image, label: t.image, visible: filter.image },
		{ key: SelectedType.PINFL, label: t.PINFL, visible: filter.PINFL },
		{
			key: SelectedType.date_of_birth,
			label: t.date_of_birth,
			visible: filter.date_of_birth,
		},
		{
			key: SelectedType.department,
			label: t.department,
			visible: filter.department,
		},
		{ key: SelectedType.gender, label: t.gender, visible: filter.gender },
		{
			key: SelectedType.nationality,
			label: t.nationality,
			visible: filter.nationality,
		},
		{
			key: SelectedType.passport_series_and_number,
			label: t.passport_series_and_number,
			visible: filter.passport_series_and_number,
		},
		{ key: SelectedType.position, label: t.position, visible: filter.position },
		{
			key: SelectedType.work_schedule,
			label: t.work_schedule,
			visible: filter.work_schedule,
		},
	]
	return (
		<Modal
			open={filter.isOpenModal}
			onClose={() => {
				setFilter({ isOpenModal: false })
			}}
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 700,
					bgcolor: theme.palette.background.default,
					boxShadow: 24,
					borderRadius: 2,
					p: 3,
					border: '2px solid',
					borderColor: theme.palette.primary.main,
					color: theme.palette.text.primary,
				}}
			>
				<Typography variant='h6' mb={2}>
					{t.settings_for_fields}
				</Typography>
				<FormGroup
					sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
				>
					{columns.map((col, index) => (
						<FormControlLabel
							key={index}
							control={
								<Switch
									defaultChecked={col.visible}
									onClick={() => {
										setFilter({ [col.key]: col.visible ? false : true })
									}}
								/>
							}
							label={col.label}
						/>
					))}
				</FormGroup>
			</Box>
		</Modal>
	)
}
