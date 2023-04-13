import { useState } from 'react'
import './App.css'
import { useForm } from 'react-hook-form'
import { MONTHS_IN_YEAR, getFutureValue, getPresentValue } from './financialFreedom/utils/formulas'

function App () {
  const { register, handleSubmit } = useForm()
  const [futureValue, setFutureValue] = useState(0)
  const [presentValue, setPresentValue] = useState(0)
  const [investWithSimpleInterest, setInvestWithSimpleInterest] = useState(0)
  const [pasiveIncome, setPasiveIncome] = useState(0)

  const onSubmit = data => {
    calculateCompoundInterest(data)
  }

  const calculateCompoundInterest = (data) => {
    const input = {
      ...data,
      paymentIsDueAtBeginningOfPeriod: true,
      yearlyInterestRate: data.yearlyInterestRate / 100,
      historicInflation: data.historicInflation / 100
    }
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
  return (
    <section>
      <h3>Calculadora Libertad financiera</h3>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
        <input placeholder='Tu capital inicial...' {...register('initialCapital')} type='number' />
        <input placeholder='Tu inversión mensual...' {...register('paymentPerPeriod')} type='number' />
        <input placeholder='cantidad de años...' {...register('years')} type='number' />
        <input placeholder='10' {...register('yearlyInterestRate')} type='number' />
        <input placeholder='3' {...register('historicInflation')} type='number' />
        <button>Calcular</button>
      </form>
      <article>
        <h3>Resultados</h3>
        <p>Valor futuro: $ {futureValue}</p>
        <p>Valor presente: $ {presentValue}</p>
        <p>Inversión con interés simple: $ {investWithSimpleInterest}</p>
        <p>Ingreso pasivo mensual: $ {pasiveIncome}</p>
      </article>
    </section>
  )
}

export default App
