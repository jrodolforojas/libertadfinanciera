import { useEffect, useState } from 'react'
import { getAllBasicPassiveRates, getTodayBasicPassiveRate } from '../services/api'

export function useBasicPassiveRates () {
  const [basicPassiveRates, setBasicPassiveRates] = useState([])
  const [todayBasicPassiveRate, setTodayBasicPassiveRate] = useState({
    value: 0,
    timestamp: Date.now()
  })
  const [isLoading, setIsLoading] = useState(true)

  const [dateRange, setDateRange] = useState({})

  const onChangeDateRange = (newDateRange) => {
    setDateRange(newDateRange)
  }

  useEffect(() => {
    getAllBasicPassiveRates({ dateFrom: dateRange.from, dateTo: dateRange.to }).then((data) => {
      setBasicPassiveRates(data)
      setIsLoading(false)
    }).catch((error) => {
      console.log({ error })
    })
  }, [dateRange])

  useEffect(() => {
    getTodayBasicPassiveRate().then(data => {
      setTodayBasicPassiveRate(data)
      setIsLoading(false)
    }).catch(error => {
      console.log({ error })
    })
  }, [])

  return {
    basicPassiveRates,
    todayBasicPassiveRate,
    isLoading,
    dateRange,
    onChangeDateRange
  }
}
