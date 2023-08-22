import { useEffect, useState } from 'react'
import { getAllExchangeRates, getTodayExchangeRate } from '../services/api'

export function useExchangeRates () {
  const [exchangeRates, setExchangeRates] = useState([])
  const [todayExchangeRate, setTodayExchangeRate] = useState({
    sale: 0,
    buy: 0,
    timestamp: Date.now()
  })
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState({})

  const onChangeDateRange = (newDateRange) => {
    setDateRange(newDateRange)
  }

  useEffect(() => {
    getAllExchangeRates({ dateFrom: dateRange.from, dateTo: dateRange.to }).then((data) => {
      setExchangeRates(data)
      setIsLoading(false)
    }).catch((error) => {
      console.log({ error })
    })
  }, [dateRange])

  useEffect(() => {
    getTodayExchangeRate().then(data => {
      setTodayExchangeRate(data)
      setIsLoading(false)
    }).catch(error => {
      console.log({ error })
    })
  }, [])

  return {
    exchangeRates,
    todayExchangeRate,
    isLoading,
    dateRange,
    onChangeDateRange
  }
}
