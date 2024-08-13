'use client'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart'

const chartConfig = {
  sentiment: {
    label: 'Sentiment',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

const HistoryChart = ({ data }) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[550px] w-full"
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="createdAt"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) =>
            new Date(value).toLocaleString('en-us', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          }
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="sentimentScore"
          type="natural"
          stroke="var(--color-sentiment)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}

export default HistoryChart
