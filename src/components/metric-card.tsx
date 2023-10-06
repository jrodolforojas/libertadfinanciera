import { type MetricCardValue } from '@/types/metric'
import { Card, Metric, Text } from '@tremor/react'

export default function MetricCard({ metrics }: {
  metrics: MetricCardValue[]
}) {
  return (
    <Card className='flex justify-between items-center flex-col sm:gap-y-0 gap-y-5 bg-primary min-w-80 sm:mb-0 mb-5'>
      {metrics.map(metric => {
        const { label, value, symbol } = metric
        let valueWithSymbol = ''
        if (symbol && symbol.orientation === 'left') valueWithSymbol = `${symbol.value} ${value}`
        if (symbol && symbol.orientation === 'right') valueWithSymbol = `${value}${symbol.value}`
        if (!symbol) valueWithSymbol = value

        return (
          <div className='flex flex-col items-center justify-center' key={label}>
            <Metric className='text-secondary'>{valueWithSymbol}</Metric>
            <Text className='text-gray-400'>{label}</Text>
          </div>
        )
      })}
    </Card >
  )
}
