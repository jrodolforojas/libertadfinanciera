import { DateRangePicker, DateRangePickerItem } from '@tremor/react'
import { es } from 'date-fns/locale'

const minimumDate = new Date(1983, 0, 1)
const todayDate = new Date()

export function DateRangeSpanish ({ dateRange, onChange }) {
  const oneMonthAgoDate = new Date().setMonth(todayDate.getMonth() - 1)
  const oneYearAgoDate = new Date().setFullYear(todayDate.getFullYear() - 1)
  return (
    <DateRangePicker
      value={dateRange}
      onValueChange={onChange}
      locale={es}
      selectPlaceholder='Seleccionar'
      color='rose'
      minDate={minimumDate}
      maxDate={todayDate}
    >
      <DateRangePickerItem
        key='month-from-today'
        value='month-from-today'
        from={oneMonthAgoDate}
      >
        Hace un mes
      </DateRangePickerItem>
      <DateRangePickerItem
        key='half'
        value='half'
        from={oneYearAgoDate}
      >
        Hace un año
      </DateRangePickerItem>
    </DateRangePicker>
  )
}
