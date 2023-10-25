'use client'

import MetricCard from '@/components/metric-card'
import { type FinancialFreedomCalculatorFormValues } from '@/types/form/financial-freedom'
import { type MetricCardValue } from '@/types/metric'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { calculateFutureValue, calculatePresentValue } from './formulas'
import { useState } from 'react'

const metricDefaultValues: MetricCardValue[] = [
  {
    value: '240000',
    label: 'Inversión Anual'
  },
  {
    value: '3871.01',
    label: 'Si solamente lo ahorro'
  },
  {
    value: '46452.16',
    label: 'Inversión con interés compuesto'
  },
  {
    value: '46452.16',
    label: 'Diferencia entre inversión y ahorro'
  },
  {
    value: '46452.16',
    label: 'Valor presente de la inversión (descontando la inflación)'
  },
  {
    value: '46452.16',
    label: 'Ingreso pasivo anual con interés simple'
  },
  {
    value: '46452.16',
    label: 'Ingreso pasivo mensual con interés simple'
  }
]

const financialFreedomSchema = yup.object({
  initialCapital: yup.number().required().min(0),
  mensualInvestment: yup.number().required().min(0),
  years: yup.number().required().min(0),
  interesRateCompountInterest: yup.number().required().min(0),
  interesRateSimpleInterest: yup.number().required().min(0),
  inflation: yup.number().required().min(0)
})

export default function FinalcialFreedomCalculatorForm() {
  const { register, handleSubmit } = useForm<FinancialFreedomCalculatorFormValues>({
    resolver: yupResolver(financialFreedomSchema)
  })

  const [metrics, setMetrics] = useState<MetricCardValue[]>(metricDefaultValues)

  const onSubmit: SubmitHandler<FinancialFreedomCalculatorFormValues> = (data) => {
    const { initialCapital, interesRateCompountInterest, interesRateSimpleInterest, inflation, years, mensualInvestment } = data
    const monthy = 12
    const anualInvestment = mensualInvestment * 12
    const savingOnly = anualInvestment * years + initialCapital
    const futureValue = calculateFutureValue(initialCapital, (interesRateCompountInterest / 100) / monthy, years * monthy, mensualInvestment)
    const savingAndFutureValueDifference = futureValue - savingOnly
    const presentValue = calculatePresentValue(futureValue, inflation / 100, years)
    const passiveAnualIncomeWithSimpleInterest = presentValue * (interesRateSimpleInterest / 100)
    const passiveMonthyIncome = passiveAnualIncomeWithSimpleInterest / 12

    const newMetrics: MetricCardValue[] = [
      {
        value: `$ ${anualInvestment.toFixed(0)}`,
        label: 'Inversión Anual'
      },
      {
        value: `$ ${savingOnly.toFixed(0)}`,
        label: 'Si solamente lo ahorro'
      },
      {
        value: `$ ${futureValue.toFixed(0)}`,
        label: 'Inversión con interés compuesto'
      },
      {
        value: `$ ${savingAndFutureValueDifference.toFixed(0)}`,
        label: 'Diferencia entre inversión y ahorro'
      },
      {
        value: `$ ${presentValue.toFixed(0)}`,
        label: 'Valor presente de la inversión (descontando la inflación)'
      },
      {
        value: `$ ${passiveAnualIncomeWithSimpleInterest.toFixed(0)}`,
        label: 'Ingreso pasivo anual con interés simple'
      },
      {
        value: `$ ${passiveMonthyIncome.toFixed(0)}`,
        label: 'Ingreso pasivo mensual con interés simple'
      }
    ]
    setMetrics(newMetrics)
  }

  return (
    <main className="flex flex-col items-center justify-between px-10 sm:ml-64 sm:mt-5">
      <h2 className="text-2xl font-bold mb-5 text-center text-primary dark:text-white mb-5">Calculadora de Libertad Financiera</h2>
      <section className="flex justify-between w-full max-w-6xl sm:flex-row flex-col">
        <form className="flex flex-col w-full mt-8">
          <div className="mb-6">
            <label htmlFor='initialCapital' className="block mb-2 text-sm font-medium text-blue-primary">Capital Inicial</label>
            <input type='number' id='initialCapital' {...register('initialCapital')}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
              placeholder='10000' />
          </div>
          <div className="mb-6">
            <label htmlFor='mensualInvestment' className="block mb-2 text-sm font-medium text-blue-primary">Inversión mensual</label>
            <input type='number' id='mensualInvestment' {...register('mensualInvestment')}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
              placeholder='1000' />
          </div>
          <div className="mb-6">
            <label htmlFor='years' className="block mb-2 text-sm font-medium text-blue-primary">Cantidad de años</label>
            <input type='number' id='years' {...register('years')}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
              placeholder='20' />
          </div>
          <div className="mb-6">
            <label htmlFor='interesRateCompountInterest' className="block mb-2 text-sm font-medium text-blue-primary">Rendimiento promedio anual con Interés Compuesto</label>
            <input type='number' id='interesRateCompountInterest' {...register('interesRateCompountInterest')}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
              placeholder='10' />
          </div>
          <div className="mb-6">
            <label htmlFor='interesRateSimpleInterest' className="block mb-2 text-sm font-medium text-blue-primary">Rendimiento promedio anual con Interés Simple</label>
            <input type='number' id='interesRateSimpleInterest' {...register('interesRateSimpleInterest')}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
              placeholder='10' />
          </div>
          <div className="mb-6">
            <label htmlFor='inflation' className="block mb-2 text-sm font-medium text-blue-primary">Promedio inflación histórica</label>
            <input type='number' id='inflation' {...register('inflation')}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
              placeholder='4' />
          </div>
          <button type="button"
            className="text-white w-full bg-secondary hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 font-medium rounded-lg
          text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600
          dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleSubmit(onSubmit)}>Calcular</button>
        </form>
        <div className="flex mt-8 sm:ml-10 w-full">
          <MetricCard metrics={metrics} />
        </div>
      </section>
    </main>
  )
}
