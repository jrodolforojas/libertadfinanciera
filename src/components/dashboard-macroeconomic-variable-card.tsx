import { Card, Metric, Text } from '@tremor/react'
import { toTwoDecimals } from '@/utils/metrics-format'
import { type DashboardMetric } from '@/types/dahsboard-metric'

export default function DashboardMacroeconomicVariableCard({ title, metrics }: {
  title: string
  metrics: DashboardMetric[]
}) {
  return (
    <article className='flex w-full flex-col gap-y-2'>
      <h3 className='text-lg font-bold text-blue-text mt-3 w-full text-center'>{title}</h3>
      <div className='flex w-full gap-x-1'>
        {metrics.map(metric => {
          const { value, date, symbol, flag } = metric
          const formattedValue = `${toTwoDecimals(value)}${symbol}`
          return (
            <Card className='flex justify-center flex-col items-center bg-blue-primary min-w-80' key={crypto.randomUUID()}>
              <Metric className='text-secondary'>{formattedValue}</Metric>
              <Text className='text-gray-400 mt-5'>{date}</Text>
              {flag && <Text className='text-gray-400'>{flag}</Text>}
            </Card>
          )
        })}
      </div>
    </article>
  )
}
