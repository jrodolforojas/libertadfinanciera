import { type RentaVacacionalFormValues } from '@/types/form/renta-vacacional'
import { toTwoDecimals } from '@/utils/metrics-format'
import { useWatch, type Control } from 'react-hook-form'

export default function PercentSpan({ control, index }: {
  control: Control<RentaVacacionalFormValues>
  index: number
}) {
  const formValues = useWatch({
    control,
    name: 'initialCapitalOptions'
  })
  if (formValues == null) {
    return 0
  }
  let sum = 0
  formValues.forEach(item => {
    sum += item.amount ?? 0
  })

  const currentValue = formValues[index].amount ?? 0
  const percent = 100 * currentValue / sum

  const percentFormatted = toTwoDecimals(percent)

  if (percentFormatted === 'NaN') {
    return null
  }

  return (
    <span
      className="mb-2 text-primary text-sm text-center flex items-center justify-center w-52 font-bold">
      {percentFormatted} %
    </span>
  )
}
