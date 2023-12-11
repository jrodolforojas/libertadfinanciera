import { type PortfolioFormValues } from '@/types/form/portfolio'
import { toTwoDecimals } from '@/utils/metrics-format'
import { useWatch, type Control } from 'react-hook-form'

export default function PortfolioPercentSpan({ control, index }: {
  control: Control<PortfolioFormValues>
  index: number
}) {
  const formValues = useWatch({
    control,
    name: 'investments'
  })
  if (formValues == null) {
    return 0
  }
  let sum = 0
  formValues.forEach(item => {
    sum += item.todayValue ?? 0
  })

  const currentValue = formValues[index].todayValue ?? 0
  const percent = 100 * currentValue / sum

  const percentFormatted = toTwoDecimals(percent)

  if (percentFormatted === 'NaN') {
    return null
  }

  return (
    <span
      className="text-primary text-sm text-center flex items-center justify-center font-bold">
      {percentFormatted} %
    </span>
  )
}
