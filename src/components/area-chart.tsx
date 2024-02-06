import { type ExchangeRateSpanish } from '@/types/api/exchange-rate'
import { LABELS } from '@/utils/labels'
import { AreaChart as TremorAreaChart, Card, Title } from '@tremor/react'

interface Props {
  title: string
  data: ExchangeRateSpanish[]
  categories: string[]
  colors: Array<'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'>
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
        noDataText={LABELS.NO_DATA_FOUND}
      />
    </Card>
  )
}
