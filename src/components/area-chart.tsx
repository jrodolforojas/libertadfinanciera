import { ExchangeRateSpanish, type ExchangeRate } from '@/types/api/exchange-rate'
import { AreaChart as TremorAreaChart, Card, Title } from '@tremor/react'
import { format } from 'date-fns'

interface Props {
  title: string
  data: ExchangeRateSpanish[]
  categories: string[]
  colors: ("slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose")[]
  minValue?: number
}
export default async function AreaChart({ title, data, categories, colors, minValue = 500 }: Props) {
  return (
    <Card>
      <Title>{title}</Title>
      <TremorAreaChart
        className='mt-5'
        index='dateFormatted'
        data={data}
        categories={categories}
        colors={colors}
        minValue={minValue}
        noDataText='No hay datos para mostrar'
      />
    </Card>
  )
}