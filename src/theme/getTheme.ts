import { createTheme } from '@mui/material/styles'

export const getTheme = (mode: 'light' | 'dark') =>
	createTheme({
		palette: {
			mode,
			primary: {
				main:
					mode === 'light' ? 'rgba(6, 186, 209, 1)' : 'rgba(151, 255, 244, 1)',
				contrastText: '#fff',
			},
			secondary: {
				main: mode === 'light' ? '#fff' : '#000',
			},
			background: {
				default: mode === 'light' ? '#f0f0f0' : '#000',
				paper: mode === 'light' ? '#fff' : '#1f1f1fff',
			},
			text: {
				primary: mode === 'light' ? '#000' : '#fff',
			},

			divider:
				mode == 'dark' ? 'rgba(151, 255, 244, 1)' : 'rgba(147, 192, 198, 1)',
		},
		shape: {
			borderRadius: '10px',
		},
		typography: {
			fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
			fontSize: 14,
		},
	})
