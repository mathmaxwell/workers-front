import { TextField } from '@mui/material'

const ReadOnlyTexField = ({
	label,
	textField,
}: {
	label: string
	textField: string
}) => {
	return (
		<TextField
			id='outlined-read-only-input'
			label={label}
			defaultValue={textField}
			slotProps={{
				input: {
					readOnly: true,
				},
			}}
		/>
	)
}

export default ReadOnlyTexField
