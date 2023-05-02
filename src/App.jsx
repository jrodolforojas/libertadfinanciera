import { useState } from 'react'
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
    <main className='flex items-center justify-center bg-slate-800 min-h-screen w-full'>
      <section>
        <h1 className='mb-5 text-4xl text-white'>Calculadora Libertad financiera</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
          <label for='initialCapital-range' class='block mb-3 mt-3 text-sm font-medium text-white'>Capital inicial</label>
          <input
            id='initialCapital-range' type='range' {...register('initialCapital')}
            class='w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700 accent-orange-600'
          />
          <label for='paymentPerPeriod-range' class='block mb-3 mt-3 text-sm font-medium text-white'>Inversión mensual</label>
          <input
            id='paymentPerPeriod-range' type='range' {...register('paymentPerPeriod')}
            class='w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700 accent-orange-600'
          />
          <label for='years-range' class='block mb-3 mt-3 text-sm font-medium text-white'>Cantidad de años</label>
          <input
            id='years-range' type='range' {...register('years')}
            class='w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700 accent-orange-600'
          />
          <label for='yearlyInterestRate-range' class='block mb-3 mt-3 text-sm font-medium text-white'>Rendimiento promedio anual</label>
          <input
            id='yearlyInterestRate-range' type='range' {...register('yearlyInterestRate')}
            class='w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700 accent-orange-600'
          />
          <label for='historicInflation-range' class='block mb-3 mt-3 text-sm font-medium text-white'>Inflación histórica</label>
          <input
            id='historicInflation-range' type='range' {...register('historicInflation')}
            class='w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700 accent-orange-600'
          />
          <button className='mt-8 mb-8 p-5 bg-orange-500 rounded-lg text-lg'>Calcular</button>
        </form>
        <div className='flex flex-col'>
          <h3 className='text-2xl self-center text-white mb-5'>Resultados</h3>
          <p className='text-white text-xl'>Valor futuro:<strong className='text-orange-500 text-2xl ml-2'>${futureValue}</strong></p>
          <p className='text-white text-xl'>Valor presente:<strong className='text-orange-500 text-2xl ml-2'>${presentValue}</strong></p>
          <p className='text-white text-xl'>Inversión con interés simple:<strong className='text-orange-500 text-2xl ml-2'>${investWithSimpleInterest}</strong></p>
          <p className='text-white text-xl'>Ingreso pasivo mensual:<strong className='text-orange-500 text-2xl ml-2'>${pasiveIncome}</strong></p>
        </div>
      </section>
    </main>
  )
}

export default App
