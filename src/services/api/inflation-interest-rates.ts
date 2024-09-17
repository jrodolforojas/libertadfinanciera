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
    cache: 'no-cache'
  })
  if (!response.ok) throw new Error('Error fetching inflation interest rates. Status: ' + response.status)
  const { data } = await response.json() as InflationRateResponse

  const dataFormatted = data.map(item => ({
    ...item,
    dateFormatted: format(new Date(item.date), 'dd/MM/yyyy')
  }))

  const rates = dataFormatted.reverse().map((item, index) => {
    let devaluation = 0
    if (index > 0) {
      devaluation = ((item.value / dataFormatted[index - 1]?.value) - 1) * 100
    }
    return {
      ...item,
      devaluation
    }
  })
  return rates.reverse()
}

export const getInflationRatesByPeriocity = async ({ country, periocity }: { country: string, periocity: string }) => {
  let url = API_URL + '/inflation_rates/'
  if (country === 'cr') {
    url += 'cr'
  } else if (country === 'usa') {
    url += 'usa'
  }

  url += `/filter?periocity=${periocity}`

  const response = await fetch(url, {
    cache: 'no-cache'
  })

  if (!response.ok) throw new Error('Error fetching credit exchange rates. Status: ' + response.status)
  const { data } = await response.json() as InflationRateResponse

  const dataFormatted = data.map(item => ({
    ...item,
    dateFormatted: format(new Date(item.date), 'dd/MM/yyyy')
  }))

  const rates = dataFormatted.reverse().map((item, index) => {
    let devaluation = 0
    if (index > 0) {
      devaluation = ((item.value / dataFormatted[index - 1]?.value) - 1) * 100
    }
    return {
      ...item,
      devaluation
    }
  })
  return rates.reverse()
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
    next: { revalidate: 5 }
  })

  if (!response.ok) throw new Error('Error fetching credit exchange rates. Status: ' + response.status)
  const { data } = await response.json() as InflationRateTodayResponse

  console.log(data)
  const rate: InflationRate = {
    ...data,
    dateFormatted: format(new Date(data.date), 'dd/MM/yyyy')
  }
  return rate
}
