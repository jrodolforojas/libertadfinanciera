import { AreaChart, Card, Title } from '@tremor/react'

export function ExchangeRateAreaChart ({ title, data, categories, colors, minValue = 400 }) {
  const reversedData = data.reverse()
  return (
    <Card>
      <Title>{title}</Title>
      <AreaChart
        className='mt-5'
        data={reversedData}
        index='date'
        categories={categories}
        colors={colors}
        autoMinValue={minValue}
        noDataText='No hay datos para mostrar'
      />
    </Card>
  )
}
