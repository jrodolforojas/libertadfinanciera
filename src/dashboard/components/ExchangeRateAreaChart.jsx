import { AreaChart, Card, Title } from '@tremor/react'

export function ExchangeRateAreaChart ({ title, data }) {
  const reversedData = data.reverse()
  return (
    <Card>
      <Title>{title}</Title>
      <AreaChart
        className='mt-5'
        data={reversedData}
        index='date'
        categories={['buy', 'sale']}
        colors={['orange', 'cyan']}
        autoMinValue={400}
        noDataText='No hay datos para mostrar'
      />
    </Card>
  )
}
