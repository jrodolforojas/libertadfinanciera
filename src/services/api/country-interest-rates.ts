import { type CountryInterestRateTodayResponse, type CountryInterestRateResponse, type CountryInterestRatesRequest, type CountryInterestRate } from '@/types/api/country-interest-rate'
import { format } from 'date-fns'

const API_URL = 'https://api.libertadfinanciera.live'

export const getAllCountryInterestRates = async ({ dateFrom, dateTo, country }: CountryInterestRatesRequest) => {
  let url = API_URL
  if (country === 'cr') {
    url += '/monetary_policy_rates'
  } else if (country === 'usa') {
    url += '/country_interes_rates/usa'
  }
  if (dateFrom && dateTo) {
    url += `?date_from=${dateFrom}&date_to=${dateTo}`
  }

  const response = await fetch(url, {
    cache: 'force-cache'
  })
  if (!response.ok) {
    console.log({ msg: 'Error fetch country interest rates', country, dateFrom, dateTo, response, url })
    throw new Error('Error fetch country interest rates. Status: ' + response.status)
  }
  const { data } = await response.json() as CountryInterestRateResponse
  const rates = data.map(item => ({
    ...item,
    dateFormatted: format(new Date(item.date), 'dd/MM/yyyy')
  }))
  return rates
}

export const getTodayCountryInterestRate = async ({ country }: { country: string }) => {
  let url = API_URL
  if (country === 'cr') {
    url += '/monetary_policy_rates/today'
  } else if (country === 'usa') {
    url += '/country_interes_rates/usa/today'
  }

  const response = await fetch(url, {
    cache: 'force-cache'
  })
  if (!response.ok) {
    console.log({ msg: 'Error fetch country interest rates', country, response, url })
    throw new Error('Error fetch country interest rates. Status: ' + response.status)
  }
  const { data } = await response.json() as CountryInterestRateTodayResponse

  const rate: CountryInterestRate = {
    ...data,
    dateFormatted: format(new Date(data.date), 'dd/MM/yyyy')
  }
  console.log({ rate })
  return rate
}
