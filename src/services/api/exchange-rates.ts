import type { ExchangeRate, ExchangeRateResponse, ExchangeRateTodayResponse, ExchangeRatesRequest } from '@/types/api/exchange-rate'
import { format } from 'date-fns'

const API_URL = 'https://api.libertadfinanciera.live'

export const getAllExchangeRates = async ({ dateFrom, dateTo }: ExchangeRatesRequest) => {
  let url = API_URL + '/exchange_rates'
  if (dateFrom && dateTo) {
    url += `?date_from=${dateFrom}&date_to=${dateTo}`
  }

  const response = await fetch(url, {
    next: { revalidate: 2 }
  })
  if (!response.ok) throw new Error('Error fetching exchange rates. Status: ' + response.status)
  const { data } = await response.json() as ExchangeRateResponse
  const dataFormatted = data.map(item => ({
    ...item,
    dateFormatted: format(new Date(item.date), 'dd/MM/yyyy')
  }))

  const exchangeRates = dataFormatted.reverse().map((item, index) => {
    let devaluation = 0
    if (index > 0) {
      devaluation = ((item.sale / dataFormatted[index - 1]?.sale) - 1) * 100
    }
    return {
      ...item,
      devaluation
    }
  })

  return exchangeRates.reverse()
}

export const getExchangeRatesByPeriocity = async (periocity: string) => {
  const originUrl = API_URL + '/exchange_rates/filter'
  const url = new URL(originUrl)
  url.searchParams.append('periocity', periocity)

  const response = await fetch(url.toString(), {
    next: { revalidate: 20 }
  })
  if (!response.ok) {
    console.error('Error fetching exchange rates by periocity. Status: ' + response.status)
    return []
  }
  const { data } = await response.json() as ExchangeRateResponse
  const dataFormatted = data.map(item => ({
    ...item,
    dateFormatted: format(new Date(item.date), 'dd/MM/yyyy')
  }))

  const exchangeRates = dataFormatted.reverse().map((item, index) => {
    let devaluation = 0
    if (index > 0) {
      devaluation = ((item.sale / dataFormatted[index - 1]?.sale) - 1) * 100
    }
    return {
      ...item,
      devaluation
    }
  })

  return exchangeRates.reverse()
}

export const getTodayExchangeRate = async () => {
  const url = API_URL + '/exchange_rates/today'

  const response = await fetch(url, {
    next: { revalidate: 60 }
  })
  if (!response.ok) throw new Error('Error fetching today exchange rate. Status: ' + response.status)
  const { data } = await response.json() as ExchangeRateTodayResponse

  const exchangeRate: ExchangeRate = {
    ...data,
    dateFormatted: format(new Date(data.date), 'dd/MM/yyyy')
  }
  return exchangeRate
}
