import { Box, CircularProgress } from '@mui/material'

const Loading = () => {
	return (
		<>
			<Box
				sx={{
					width: '100vw',
					height: '100vh',
					position: 'absolute',
					top: 0,
					left: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'rgba(0, 0, 0, 0.3)',
					backdropFilter: 'blur(2px)',
					zIndex: 9999,
				}}
			>
				<CircularProgress />
			</Box>
		</>
	)
}

export default Loading
