'use client'

import { DateRangePicker, DateRangePickerItem } from "@tremor/react"
import { es } from 'date-fns/locale'
import { DATE_RANGES } from '@/mocks/date-ranges'
import { DateRange } from "@/types/date-range"

const minimumDate = new Date(1983, 0, 1)
const todayDate = new Date()

export default function Range() {
  const dateRanges: DateRange[] = [
    ...DATE_RANGES,
    {
      key: 'max',
      label: 'Máximo',
      date: minimumDate
    }
  ]
  return (
    <DateRangePicker
      locale={es}
      placeholder=""
      selectPlaceholder='Seleccionar'
      minDate={minimumDate}
      maxDate={todayDate}
    >
      {dateRanges.map(dateRange => (
        <DateRangePickerItem
          key={dateRange.key}
          value={dateRange.key}
          from={dateRange.date}
        >
          {dateRange.label}
        </DateRangePickerItem>
      ))}
    </DateRangePicker>
  )
}