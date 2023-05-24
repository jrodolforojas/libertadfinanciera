import { useState, useEffect } from 'react'
import { MONTHS_IN_YEAR, getFutureValue, getPresentValue } from './utils/formulas'
import { InputRange } from './components/InputRange'
import { ResultLabel } from './components/ResultLabel'

export function FinancialFreedom () {
  const [futureValue, setFutureValue] = useState(0)
  const [presentValue, setPresentValue] = useState(0)
  const [investWithSimpleInterest, setInvestWithSimpleInterest] = useState(0)
  const [pasiveIncome, setPasiveIncome] = useState(0)
  const [initialCapital, setInitialCapital] = useState(10000)
  const [paymentPerPeriod, setPaymentPerPeriod] = useState(1000)
  const [years, setYears] = useState(20)
  const [yearlyInterestRate, setYearlyInterestRate] = useState(10)
  const [historicInflation, setHistoricInflation] = useState(3)
  const [onlySaveIt, setOnlySaveIt] = useState(0)

  const handleChangeInitialCapital = (event) => {
    setInitialCapital(event.target.value)
  }

  const handleChangePaymentPerPeriod = (event) => {
    setPaymentPerPeriod(event.target.value)
  }

  const handleChangeYears = (event) => {
    setYears(event.target.value)
  }

  const handleChangeYearlyInterestRate = (event) => {
    setYearlyInterestRate(event.target.value)
  }

  const handleChangeHistoricInflation = (event) => {
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
    const futureValueFormatted = -futureValue.toFixed(2)
    setFutureValue(futureValueFormatted)

    const presentValue = getPresentValue({ rate: input.historicInflation, nper: input.years, fv: futureValue })
    const presentValueFormatted = presentValue.toFixed(2)
    setPresentValue(presentValueFormatted)

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

  return (
    <section>
      <header>
        <h1 className='mb-5 text-4xl text-white text-center px-2 mt-4 md:mt-0'>Calculadora Libertad financiera</h1>
      </header>
      <form onSubmit={calculateCompoundInterest} className='flex flex-col w-full'>
        <InputRange inputName='initialCapital' label='Capital inicial' value={initialCapital} onChange={handleChangeInitialCapital} min={0} max={500000} />
        <InputRange inputName='paymentPerPeriod' label='Inversión mensual' min={100} max={5000} value={paymentPerPeriod} onChange={handleChangePaymentPerPeriod} />
        <InputRange inputName='years' label='Cantidad de años' min={1} max={100} value={years} onChange={handleChangeYears} isYears />
        <InputRange
          inputName='yearlyInterestRate' label='Rendimiento promedio anual' min={0} max={20} value={yearlyInterestRate}
          onChange={handleChangeYearlyInterestRate} isPorcentage
        />
        <InputRange isPorcentage inputName='historicInflation' label='Inflación histórica' min={0} max={20} value={historicInflation} onChange={handleChangeHistoricInflation} />
      </form>
      <div className='flex flex-col gap-2 mb-5'>
        <h3 className='text-2xl self-center text-white my-5'>Resultados</h3>
        <ResultLabel label='Si solamente ahorro' value={onlySaveIt} />
        <ResultLabel label='Valor futuro' value={futureValue} />
        <ResultLabel label='Valor presente' value={presentValue} />
        <ResultLabel label='Inversión con interés simple' value={investWithSimpleInterest} />
        <ResultLabel label='Ingreso pasivo mensual' value={pasiveIncome} />
      </div>
    </section>
  )
}
