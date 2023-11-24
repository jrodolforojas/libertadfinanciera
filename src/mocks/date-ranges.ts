import type { DateRange } from '@/types/date-range'

const today = new Date(Date.now())

export const DATE_RANGES: DateRange[] = [
  {
    key: 'ten-days-ago',
    label: 'Hace 10 días',
    date: new Date(new Date().setDate(today.getDate() - 10))
  },
  {
    key: 'thirty-days-ago',
    label: 'Hace 30 días',
    date: new Date(new Date().setDate(today.getDate() - 30))
  },
  {
    key: 'one-month-ago',
    label: 'Hace 1 mes',
    date: new Date(new Date().setMonth(today.getMonth() - 1))
  },
  {
    key: 'three-months-ago',
    label: 'Hace 3 mes',
    date: new Date(new Date().setMonth(today.getMonth() - 3))
  },
  {
    key: 'six-months-ago',
    label: 'Hace 6 mes',
    date: new Date(new Date().setMonth(today.getMonth() - 6))
  },
  {
    key: 'year-to-date',
    label: 'De Enero hasta la fecha',
    date: new Date(today.getFullYear(), 0, 1)
  },
  {
    key: 'one-year-ago',
    label: 'Hace 1 año',
    date: new Date(new Date().setFullYear(today.getFullYear() - 1))
  },
  {
    key: 'five-years-ago',
    label: 'Hace 5 años',
    date: new Date(new Date().setFullYear(today.getFullYear() - 5))
  },
  {
    key: 'ten-years-ago',
    label: 'Hace 10 años',
    date: new Date(new Date().setFullYear(today.getFullYear() - 10))
  }
]
