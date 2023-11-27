import { type CreditInterestRateTodayResponse, type CreditInterestRateResponse, type CreditInterestRatesRequest, type CreditInterestRate } from '@/types/api/credit-interest-rate'
import { format } from 'date-fns'

const API_URL = 'https://api.libertadfinanciera.live'

export const getAllCreditInterestRates = async ({ dateFrom, dateTo, country }: CreditInterestRatesRequest) => {
  let url = API_URL
  if (country === 'cr') {
    url += '/country_interes_rates/cr'
  } else if (country === 'usa') {
    url += '/prime_rates'
  }
  if (dateFrom && dateTo) {
    url += `?date_from=${dateFrom}&date_to=${dateTo}`
  }

  const response = await fetch(url, {
    cache: 'force-cache'
  })
  if (!response.ok) throw new Error('Error fetching credit interest rates. Status: ' + response.status)
  const { data } = await response.json() as CreditInterestRateResponse
  const rates = data.map(item => ({
    ...item,
    dateFormatted: format(new Date(item.date), 'dd/MM/yyyy')
  }))
  return rates
}

export const getTodayCreditInterestRate = async ({ country }: { country: string }) => {
  let url = API_URL
  if (country === 'cr') {
    url += '/country_interes_rates/cr/today'
  } else if (country === 'usa') {
    url += '/prime_rates/today'
  }

  const response = await fetch(url, {
    next: {
      revalidate: 60
    }
  })
  if (!response.ok) throw new Error('Error fetching credit exchange rates. Status: ' + response.status)
  const { data } = await response.json() as CreditInterestRateTodayResponse

  const rate: CreditInterestRate = {
    ...data,
    dateFormatted: format(new Date(data.date), 'dd/MM/yyyy')
  }
  return rate
}
