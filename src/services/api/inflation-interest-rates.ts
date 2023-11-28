import { type InflationRateTodayResponse, type InflationRateResponse, type InflationRatesRequest, type InflationRate } from '@/types/api/inflation-interest-rate'
import { format } from 'date-fns'

const API_URL = 'https://api.libertadfinanciera.live'

export const getAllInflationRates = async ({ dateFrom, dateTo, country }: InflationRatesRequest) => {
  let url = API_URL + '/inflation_rates/'
  if (country === 'cr') {
    url += 'cr'
  } else if (country === 'usa') {
    url += 'usa'
  }
  if (dateFrom && dateTo) {
    url += `?date_from=${dateFrom}&date_to=${dateTo}`
  }

  const response = await fetch(url, {
    cache: 'force-cache'
  })
  if (!response.ok) throw new Error('Error fetching inflation interest rates. Status: ' + response.status)
  const { data } = await response.json() as InflationRateResponse
  const rates = data.map(item => ({
    ...item,
    dateFormatted: format(new Date(item.date), 'dd/MM/yyyy')
  }))
  return rates
}

export const getTodayInflationRate = async ({ country }: { country: string }) => {
  let url = API_URL + '/inflation_rates/'
  if (country === 'cr') {
    url += 'cr'
  } else if (country === 'usa') {
    url += 'usa'
  }

  url += '/today'

  const response = await fetch(url, {
    next: {
      revalidate: 60
    }
  })

  if (!response.ok) throw new Error('Error fetching credit exchange rates. Status: ' + response.status)
  const { data } = await response.json() as InflationRateTodayResponse

  const rate: InflationRate = {
    ...data,
    dateFormatted: format(new Date(data.date), 'dd/MM/yyyy')
  }
  return rate
}
