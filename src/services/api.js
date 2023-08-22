import { format } from 'date-fns'
const API_URL = 'https://api.libertadfinanciera.live'

export const getAllExchangeRates = async ({ dateFrom, dateTo } = {}) => {
  let url = API_URL + '/exchange_rates'
  if (dateFrom && dateTo) {
    const dateFromFormatted = format(dateFrom, 'yyyy/MM/dd')
    const dateToFormatted = format(dateTo, 'yyyy/MM/dd')
    url = url + '?date_from=' + dateFromFormatted + '&date_to=' + dateToFormatted
  }

  const response = await fetch(url)
  if (!response.ok) throw new Error('Error fetching exchange rates. Status: ' + response.status)
  const { data } = await response.json()
  const exchangeRates = data.map(exchangeRate => {
    const dateFormatted = format(new Date(exchangeRate.date), 'dd/MM/yyyy')
    return {
      ...exchangeRate,
      timestamp: exchangeRate.date,
      date: dateFormatted
    }
  })
  return exchangeRates
}

export const getTodayExchangeRate = async () => {
  const url = API_URL + '/exchange_rates/today'
  const response = await fetch(url)
  if (!response.ok) throw new Error('Error fetching today exchange rate. Status: ' + response.status)
  const { data } = await response.json()
  const dateFormatted = format(new Date(data.date), 'dd/MM/yyyy')

  return {
    ...data,
    timestamp: data.date,
    date: dateFormatted
  }
}

export const getAllBasicPassiveRates = async ({ dateFrom, dateTo } = {}) => {
  let url = API_URL + '/tbp'
  if (dateFrom && dateTo) {
    const dateFromFormatted = format(dateFrom, 'yyyy/MM/dd')
    const dateToFormatted = format(dateTo, 'yyyy/MM/dd')
    url = url + '?date_from=' + dateFromFormatted + '&date_to=' + dateToFormatted
  }

  const response = await fetch(url)
  if (!response.ok) throw new Error('Error fetching basic passive rates. Status: ' + response.status)
  const { data } = await response.json()

  const basicPassiveRates = data.map(basicPassiveRate => {
    const dateFormatted = format(new Date(basicPassiveRate.date), 'dd/MM/yyyy')
    return {
      ...basicPassiveRate,
      timestamp: basicPassiveRate.date,
      date: dateFormatted
    }
  })

  return basicPassiveRates
}

export const getTodayBasicPassiveRate = async () => {
  const url = API_URL + '/tbp/today'
  const response = await fetch(url)
  if (!response.ok) throw new Error('Error fetching today basic passive rate. Status: ' + response.status)
  const { data } = await response.json()
  const dateFormatted = format(new Date(data.date), 'dd/MM/yyyy')

  return {
    ...data,
    timestamp: data.date,
    date: dateFormatted
  }
}
