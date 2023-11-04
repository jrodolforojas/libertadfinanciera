'use client'

import MetricCard from '@/components/metric-card'
import { type LargaEstanciaFormValues } from '@/types/form/larga-estancia'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { calculateLargaEstancia } from './formulas'
import { type MetricCardValue } from '@/types/metric'
import { useState } from 'react'
import { toDollarCurrency, toTwoDecimals } from '@/utils/metrics-format'

const largaEstanciaDefaultValues: MetricCardValue[] = [
  {
    value: '$ 0',
    label: 'Ingreso anual bruto'
  },
  {
    value: '$ 0',
    label: 'Impuestos'
  },
  {
    value: '$ 0',
    label: 'Rendimiento anual neto'
  },
  {
    value: '0 %',
    label: 'Porcentaje del Rendimiento anual'
  },
  {
    value: '0',
    label: 'Años para recuperar la inversión'
  },
  {
    value: '$ 0',
    label: 'Rendimiento mensual neto'
  }
]

const largaEstanciaSchema = yup.object({
  initialCapital: yup.number()
    .typeError('Capital inicial debe ser un valor numérico')
    .required('Capital inicial es un campo requerido')
    .min(0, 'Capital inicial debe ser mayor o igual a 0'),
  monthyRent: yup.number()
    .typeError('Alquiler mensual debe ser un valor numérico')
    .required('Alquiler mensual es un campo requerido')
    .min(0, 'Alquiler mensual debe ser mayor o igual a 0'),
  rentedMonths: yup.number()
    .typeError('Cantidad de meses alquilado debe ser un valor numérico')
    .required('Cantidad de meses alquilado es un campo requerido')
    .min(0, 'Cantidad de meses alquilado debe ser mayor o igual a 0')
    .max(12, 'Cantidad de meses alquilado debe como máximo 12'),
  maintenanceExpenses: yup.number()
    .typeError('Gastos de mantenimiento debe ser un valor numérico')
    .required('Gastos de mantenimiento es un campo requerido')
    .min(0, 'Gastos de mantenimiento debe ser mayor o igual a 0')
})

export default function LargaEstanciaCalculator() {
  const { register, handleSubmit, formState: { errors } } = useForm<LargaEstanciaFormValues>({
    resolver: yupResolver(largaEstanciaSchema)
  })

  const [metrics, setMetrics] = useState<MetricCardValue[]>(largaEstanciaDefaultValues)

  const onSubmit: SubmitHandler<LargaEstanciaFormValues> = (data) => {
    const result = calculateLargaEstancia(data)

    const anualReturnPercent = result.anualReturnPercent * 100
    const newMetrics: MetricCardValue[] = [
      {
        value: `${toDollarCurrency(result.grossAnualIncome)}`,
        label: 'Ingreso anual bruto'
      },
      {
        value: `${toDollarCurrency(result.taxes)}`,
        label: 'Impuestos'
      },
      {
        value: `${toDollarCurrency(result.netAnualReturn)}`,
        label: 'Rendimiento anual neto'
      },
      {
        value: `${toTwoDecimals(anualReturnPercent)} %`,
        label: 'Porcentaje del Rendimiento anual'
      },
      {
        value: `${toTwoDecimals(result.yearsToGetProfit)}`,
        label: 'Años para recuperar la inversión'
      },
      {
        value: `${toDollarCurrency(result.monthyReturn)}`,
        label: 'Rendimiento mensual neto'
      }
    ]

    setMetrics(newMetrics)
  }
  return (
    <section className="flex justify-between w-full max-w-6xl sm:flex-row flex-col">
      <form className="flex flex-col w-full mt-8" aria-label='larga estancia calculator'>
        <div className="mb-6">
          <label htmlFor='initialCapital' className="block mb-2 text-sm font-medium text-blue-primary">Inversión inicial</label>
          <input type='number' id='initialCapital' {...register('initialCapital')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='300000' />
          {errors.initialCapital && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.initialCapital.message}</span>}
        </div>
        <div className="mb-6">
          <label htmlFor='monthyRent' className="block mb-2 text-sm font-medium text-blue-primary">Alquiler mensual</label>
          <input type='number' id='monthyRent' {...register('monthyRent')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='1600' />
          {errors.monthyRent && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.monthyRent.message}</span>}
        </div>
        <div className="mb-6">
          <label htmlFor='rentedMonths' className="block mb-2 text-sm font-medium text-blue-primary">Cantidad de meses alquilado</label>
          <input type='number' id='rentedMonths' {...register('rentedMonths')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='11' />
          {errors.rentedMonths && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.rentedMonths.message}</span>}
        </div>
        <div className="mb-6">
          <label htmlFor='maintenanceExpenses' className="block mb-2 text-sm font-medium text-blue-primary">Gastos de mantenimiento</label>
          <input type='number' id='maintenanceExpenses' {...register('maintenanceExpenses')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='1600' />
          {errors.maintenanceExpenses && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.maintenanceExpenses.message}</span>}
        </div>
        <button type="button"
          onClick={handleSubmit(onSubmit)}
          className="text-white w-full bg-secondary hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 font-medium rounded-lg
          text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600
          dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Calcular</button>
      </form>
      <div className="flex mt-8 sm:ml-10 w-full">
        <MetricCard metrics={metrics} />
      </div>
    </section>
  )
}
