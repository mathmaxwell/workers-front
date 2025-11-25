import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import ChartJS from 'chart.js/auto'
import type { ChartOptions, ChartData } from 'chart.js'
import { useTheme } from '@mui/material'
import { monthNames } from '../../types/time/time'

ChartJS.register(ChartDataLabels)

const getDaysInMonth = (month: number, year: number = 2025) => {
	return new Date(year, month + 1, 0).getDate()
}

const DashboardPageChard = ({
	informationArray,
	month,
	onBarClick,
}: {
	informationArray: number[]
	month?: number
	onBarClick?: (dateStr: string) => void
}) => {
	const today = new Date()
	let labels: string[]
	let datasetLabel: string
	const theme = useTheme()
	const dates: string[] = []
	if (month === undefined || month === null) {
		labels = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
		datasetLabel = 'Значения за неделю'
		const dayOfWeek = today.getDay() || 7
		const monday = new Date(today)
		monday.setDate(today.getDate() - (dayOfWeek - 1))
		for (let i = 0; i < 7; i++) {
			const date = new Date(monday)
			date.setDate(monday.getDate() + i)
			dates.push(date.toLocaleDateString('ru-RU').split('.').join('-'))
		}
	} else {
		const daysInMonth = getDaysInMonth(month)
		labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString())
		datasetLabel = `Значения за ${[monthNames[month]]}`
		for (let i = 0; i < daysInMonth; i++) {
			const date = new Date(today.getFullYear(), month, i + 1)
			dates.push(date.toLocaleDateString('ru-RU').split('.').join('-'))
		}
	}

	const data: ChartData<'bar', number[], string> = {
		labels,
		datasets: [
			{
				label: datasetLabel,
				data: informationArray,
				backgroundColor: '#4CAF50',
				borderColor: '#388E3C',
				borderWidth: 1,
			},
		],
	}

	const options: ChartOptions<'bar'> = {
		maintainAspectRatio: false,
		layout: {
			padding: {
				top: 20,
				bottom: 10,
			},
		},
		scales: {
			y: {
				display: false,
				grid: {
					display: false,
				},
			},
			x: {
				grid: {
					display: false,
				},
				ticks: {
					font: {
						size: 12,
						weight: 500,
					},
					color: theme.palette.primary.main,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			datalabels: {
				anchor: 'end',
				align: 'end',
				color: theme.palette.primary.main,
				font: {
					weight: 'bold',
					size: 12,
				},
			},
		},
		elements: {
			bar: {
				borderRadius: 4,
			},
		},
		onClick: (_, elements) => {
			if (elements.length > 0 && onBarClick) {
				const index = elements[0].index
				const dateStr = dates[index]
				onBarClick(dateStr)
			}
		},
	}

	return (
		<div
			style={{
				width: '100%',
				maxWidth: '1200px',
				height: '230px',
				margin: '0 auto',
			}}
		>
			<Bar data={data} options={options} />
		</div>
	)
}

export default DashboardPageChard
