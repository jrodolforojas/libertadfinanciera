import { format } from 'date-fns'
const API_URL = 'https://api.libertadfinanciera.live'

export const getAllExchangeRates = () => {
  return fetch(API_URL + '/exchange_rates')
    .then(response => {
      if (!response.ok) throw new Error('Error fetching exchange rates. Status: ' + response.status)
      return response.json()
    }).then(({ data }) => {
      const exchangeRates = data.map(exchangeRate => {
        const dateFormatted = format(new Date(exchangeRate.date), 'dd/MM/yyyy')
        return {
          ...exchangeRate,
          timestamp: exchangeRate.date,
          date: dateFormatted
        }
      })
      return exchangeRates
    })
}
