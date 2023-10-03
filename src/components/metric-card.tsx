import { type MetricCardValue } from '@/types/metric'
import { Card, Metric, Text } from '@tremor/react'

export default function MetricCard({ metrics }: {
  metrics: MetricCardValue[]
}) {
  return (
    <Card className='flex sm:flex-row justify-between items-center flex-col sm:gap-y-0 gap-y-5 bg-blue'>
      {metrics.map(metric => (
        <div className='flex flex-col items-center justify-center'>
          <Metric className='text-green'>${metric.value}</Metric>
          <Text className='text-gray-400'>{metric.label}</Text>
        </div>
      ))}
    </Card>
  )
}