'use client'

import MetricCard from '@/components/metric-card'
import { type FinancialFreedomPassiveIncomeCalculatorFormValues } from '@/types/form/financial-freedom-passive-income'
import { type MetricCardValue } from '@/types/metric'
import { yupResolver } from '@hookform/resolvers/yup'
import { type SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { onSubmitFinancialFreedomPassiveIncomeCalculatorForm } from './formulas'
import { useState } from 'react'

const metricDefaultValues: MetricCardValue[] = [
  {
    value: '0',
    label: 'Ingresos pasivos anuales'
  },
  {
    value: '0',
    label: 'Capital invertido'
  }
]

const formDefaultValues: FinancialFreedomPassiveIncomeCalculatorFormValues = {
  monthlyPassiveIncome: 0,
  interestRate: 0
}

const financialFreedomSchema = yup.object().shape({
  monthlyPassiveIncome: yup.number()
    .typeError('Ingreso pasivo mensual debe ser un valor numérico')
    .required('Ingreso pasivo mensual es un campo requerido')
    .min(0, 'Ingreso pasivo mensual debe ser mayor o igual a 0')
    .max(999999999, 'Ingreso pasivo mensual debe ser menor o igual a 999999999'),
  interestRate: yup.number()
    .typeError('Rendimiento promedio anual con Interés Simple debe ser un valor numérico')
    .required('Rendimiento promedio anual con Interés Simple es un campo requerido')
    .min(0, 'Rendimiento promedio anual con Interés Simple debe ser mayor o igual a 0')
    .max(100, 'Rendimiento promedio anual con Interés Simple debe ser menor o igual a 100')
})

export default function PassiveIncomesCalculatorForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FinancialFreedomPassiveIncomeCalculatorFormValues>({
    defaultValues: formDefaultValues,
    resolver: yupResolver(financialFreedomSchema)
  })

  const [metrics, setMetrics] = useState<MetricCardValue[]>(metricDefaultValues)

  const onSubmit: SubmitHandler<FinancialFreedomPassiveIncomeCalculatorFormValues> = (data) => {
    const newMetrics = onSubmitFinancialFreedomPassiveIncomeCalculatorForm(data)
    setMetrics(newMetrics)
  }
  return (
    <section className="flex justify-between w-full max-w-6xl sm:flex-row flex-col">
      <form className="flex flex-col w-full mt-8" aria-label='finalcial freedom calculator'>
        <div className="mb-6">
          <label htmlFor='monthlyPassiveIncome' className="block mb-2 text-sm font-medium text-blue-primary">Ingresos Pasivos Mensuales</label>
          <input type='number' id='monthlyPassiveIncome' {...register('monthlyPassiveIncome')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='10000' />
          {errors.monthlyPassiveIncome && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.monthlyPassiveIncome.message}</span>}
        </div>
        <div className="mb-6">
          <label htmlFor='interestRate' className="block mb-2 text-sm font-medium text-blue-primary">Rendimiento promedio anual con Interés Simple (%)</label>
          <input type='number' id='interestRate' {...register('interestRate')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='10' />
          {errors.interestRate && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.interestRate.message}</span>}
        </div>
        <button type="button" onClick={handleSubmit(onSubmit)}
          className="text-white w-full bg-secondary hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 font-medium rounded-lg
          text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600
          dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Calcular</button>
      </form>
      <div className="flex mt-8 sm:ml-10 w-full max-h-[700px]">
        <MetricCard metrics={metrics} />
      </div>
    </section>
  )
}
