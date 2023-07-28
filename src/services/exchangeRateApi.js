const API_URL = 'https://libertadfinanciera.up.railway.app'

export const getAllExchangeRates = () => {
  return fetch(API_URL + '/exchange_rates')
    .then(response => {
      if (!response.ok) throw new Error('Error fetching exchange rates. Status: ' + response.status)
      return response.json()
    }).then(data => data)
}
