'use client'

import { DateRangePicker, DateRangePickerItem, type DateRangePickerValue } from '@tremor/react'
import { es } from 'date-fns/locale'
import { DATE_RANGES } from '@/mocks/date-ranges'
import { type DateRange } from '@/types/date-range'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

const minimumDate = new Date(1983, 0, 1)
const todayDate = new Date()

export default function Range() {
  const [dateRange, setDateRange] = useState<DateRangePickerValue>()

  const router = useRouter()
  useEffect(() => {
    const requestUrl = new URL(location.origin + location.pathname)
    if (dateRange?.from && dateRange?.to) {
      requestUrl.searchParams.set('dateFrom', format(dateRange.from, 'yyyy/MM/dd') ?? '')
      requestUrl.searchParams.set('dateTo', format(dateRange.to, 'yyyy/MM/dd') ?? '')
      router.push(requestUrl.toString())
    }
  }, [dateRange])

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
      enableYearNavigation={true}
      locale={es}
      placeholder=""
      selectPlaceholder='Seleccionar'
      minDate={minimumDate}
      maxDate={todayDate}
      value={dateRange}
      onValueChange={setDateRange}
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
