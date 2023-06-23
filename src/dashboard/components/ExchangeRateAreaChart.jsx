import { AreaChart, Card, Title } from '@tremor/react'
import { exchangeRateFormatted } from '../utils/formatters'

export function ExchangeRateAreaChart ({ title, data }) {
  return (
    <Card>
      <Title>{title}</Title>
      <AreaChart
        className='min-h-72 mt-4'
        data={data}
        index='date'
        categories={['buy', 'sale']}
        colors={['orange', 'cyan']}
        formatter={exchangeRateFormatted}
        autoMinValue={400}
      />
    </Card>
  )
}
