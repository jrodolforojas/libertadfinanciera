import type { ExchangeRate, ExchangeRateResponse, ExchangeRateTodayResponse, ExchangeRatesRequest } from '@/types/api/exchange-rate'
import { format } from 'date-fns'

const API_URL = 'https://api.libertadfinanciera.live'

export const getAllExchangeRates = async ({ dateFrom, dateTo }: ExchangeRatesRequest) => {
  let url = API_URL + '/exchange_rates'
  if (dateFrom && dateTo) {
    const dateFromFormatted = format(dateFrom, 'yyyy/MM/dd')
    const dateToFormatted = format(dateTo, 'yyyy/MM/dd')
    url = url + '?date_from=' + dateFromFormatted + '&date_to=' + dateToFormatted
  }

  const response = await fetch(url, {
    next: {
      revalidate: 60
    }
  })
  if (!response.ok) throw new Error('Error fetching exchange rates. Status: ' + response.status)
  const { data } = await response.json() as ExchangeRateResponse
  const exchangeRates = data.map(item => ({
    ...item,
    dateFormatted: format(new Date(item.date), 'dd/MM/yyyy')
  }))

  return exchangeRates
}

export const getTodayExchangeRate = async () => {
  const url = API_URL + '/exchange_rates/today'
  const response = await fetch(url, {
    next: {
      revalidate: 60
    }
  })
  if (!response.ok) throw new Error('Error fetching today exchange rate. Status: ' + response.status)
  const { data } = await response.json() as ExchangeRateTodayResponse

  const exchangeRate: ExchangeRate = {
    ...data,
    dateFormatted: format(new Date(data.date), 'dd/MM/yyyy')
  }
  return exchangeRate
}
