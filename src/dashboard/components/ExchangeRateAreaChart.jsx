import { AreaChart, Card, Title } from '@tremor/react'

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
        autoMinValue={400}
        noDataText='No hay datos para mostrar'
      />
    </Card>
  )
}
