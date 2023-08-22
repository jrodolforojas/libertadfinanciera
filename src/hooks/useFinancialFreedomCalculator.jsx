import { useEffect, useState } from 'react'
import { MONTHS_IN_YEAR, getFutureValue, getPresentValue } from '../financialFreedom/utils/formulas'

export function useFinancialFreedomCalculator () {
  const [investWithSimpleInterest, setInvestWithSimpleInterest] = useState(0)
  const [pasiveIncome, setPasiveIncome] = useState(0)
  const [initialCapital, setInitialCapital] = useState(10000)
  const [paymentPerPeriod, setPaymentPerPeriod] = useState(1000)
  const [years, setYears] = useState(20)
  const [yearlyInterestRate, setYearlyInterestRate] = useState(10)
  const [historicInflation, setHistoricInflation] = useState(3)
  const [onlySaveIt, setOnlySaveIt] = useState(0)

  const handleChangeInitialCapital = (event) => {
    event.preventDefault()
    setInitialCapital(event.target.value)
  }

  const handleChangePaymentPerPeriod = (event) => {
    event.preventDefault()
    setPaymentPerPeriod(event.target.value)
  }

  const handleChangeYears = (event) => {
    event.preventDefault()
    setYears(event.target.value)
  }

  const handleChangeYearlyInterestRate = (event) => {
    event.preventDefault()
    setYearlyInterestRate(event.target.value)
  }

  const handleChangeHistoricInflation = (event) => {
    event.preventDefault()
    setHistoricInflation(event.target.value)
  }

  const calculateCompoundInterest = () => {
    const input = {
      initialCapital,
      paymentPerPeriod,
      years,
      paymentIsDueAtBeginningOfPeriod: true,
      yearlyInterestRate: yearlyInterestRate / 100,
      historicInflation: historicInflation / 100
    }

    const saveIt = input.paymentPerPeriod * input.years * MONTHS_IN_YEAR
    setOnlySaveIt(saveIt)

    const futureValue = getFutureValue(input)
    const presentValue = getPresentValue({ rate: input.historicInflation, nper: input.years, fv: futureValue })
    const investWithSimpleInterest = presentValue * input.yearlyInterestRate
    const investWithSimpleInterestFormatted = investWithSimpleInterest.toFixed(2)
    setInvestWithSimpleInterest(investWithSimpleInterestFormatted)

    const pasiveIncome = investWithSimpleInterestFormatted / MONTHS_IN_YEAR
    const pasiveIncomeFormatted = pasiveIncome.toFixed(2)
    setPasiveIncome(pasiveIncomeFormatted)
  }

  useEffect(() => {
    calculateCompoundInterest()
  }, [initialCapital, paymentPerPeriod, years, yearlyInterestRate, historicInflation])

  return {
    onlySaveIt,
    pasiveIncome,
    investWithSimpleInterest,
    initialCapital,
    handleChangeInitialCapital,
    paymentPerPeriod,
    handleChangePaymentPerPeriod,
    years,
    handleChangeYears,
    yearlyInterestRate,
    handleChangeYearlyInterestRate,
    historicInflation,
    handleChangeHistoricInflation,
    calculateCompoundInterest
  }
}
