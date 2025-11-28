import { Box, useTheme } from '@mui/material'

const Line = () => {
	const theme = useTheme()
	return (
		<Box
			sx={{
				width: '100%',
				border: '1px solid',
				borderColor: theme.palette.primary.main,
				my: 1,
			}}
		/>
	)
}

export default Line
