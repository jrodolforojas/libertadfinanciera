'use client'

import { useState } from 'react'
import DeleteAdvancedOption from './components/delete-advanced-option'
import MetricCard from '@/components/metric-card'
import { type MetricCardValue } from '@/types/metric'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { type AdvancedOption, type RentaVacacionalFormValues } from '@/types/form/renta-vacacional'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { calculateRentaVacacional } from './formulas'

const OPTIONS = {
  TRUE: 1,
  FALSE: 0
}

const rentaVacionalDefaultValues: MetricCardValue[] = [
  {
    value: '$ 0',
    label: 'Rendimiento anual bruto'
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

const initialCapitalAdvancedDefaultOptions: AdvancedOption[] = [
  {
    name: 'Materiales y Arquitecta',
    amount: 10000,
    percent: 0
  },
  {
    name: 'Mano de Obra',
    amount: 10000,
    percent: 0
  },
  {
    name: 'Lote',
    amount: 10000,
    percent: 0
  },
  {
    name: 'Electrodomésticos',
    amount: 10000,
    percent: 0
  },
  {
    name: 'Permisos y servicios',
    amount: 10000,
    percent: 0
  }
]

const monthyExpenseAdvancedDefaultOptions: AdvancedOption[] = [
  {
    name: 'Comisión co-host',
    amount: 10000,
    percent: 0
  },
  {
    name: 'Impuestos',
    amount: 10000,
    percent: 0
  },
  {
    name: 'Mantenimiento',
    amount: 10000,
    percent: 0
  },
  {
    name: 'Seguro',
    amount: 10000,
    percent: 0
  },
  {
    name: 'Servicios públicos',
    amount: 10000,
    percent: 0
  }
]

const rentaVacacionalSchema = yup.object({
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
export default function RentaVacacionalCalculator() {
  const [initialCapitalOptions, setInitialCapitalOptions] = useState(OPTIONS.FALSE)
  const [monthyRent, setMonthyRent] = useState(OPTIONS.FALSE)
  const [monthyExpenses, setMonthyExpenses] = useState(OPTIONS.FALSE)

  const [metrics, setMetrics] = useState<MetricCardValue[]>(rentaVacionalDefaultValues)

  const { register, handleSubmit, formState: { errors } } = useForm<RentaVacacionalFormValues>({
    resolver: yupResolver(rentaVacacionalSchema)
  })

  const onSubmit: SubmitHandler<RentaVacacionalFormValues> = (data) => {
    const result = calculateRentaVacacional(data)
    const anualReturnPercent = result.anualReturnPercent * 100
    const newMetrics: MetricCardValue[] = [
      {
        value: `$ ${result.grossAnualIncome.toFixed(0)}`,
        label: 'Rendimiento anual bruto'
      },
      {
        value: `$ ${result.netAnualReturn.toFixed(0)}`,
        label: 'Rendimiento anual neto'
      },
      {
        value: `${anualReturnPercent.toFixed(0)} %`,
        label: 'Porcentaje del Rendimiento anual'
      },
      {
        value: `${result.yearsToGetProfit.toFixed(0)}`,
        label: 'Años para recuperar la inversión'
      },
      {
        value: `$ ${result.monthyReturn.toFixed(0)}`,
        label: 'Rendimiento mensual neto'
      }
    ]
    setMetrics(newMetrics)
  }

  const handleChangeInitialCapitalOptions = () => {
    if (initialCapitalOptions === OPTIONS.FALSE) {
      setInitialCapitalOptions(OPTIONS.TRUE) // true
    }
    if (initialCapitalOptions === OPTIONS.TRUE) {
      setInitialCapitalOptions(OPTIONS.FALSE) // false
    }
  }

  const handleChangeMonthyRentOptions = () => {
    if (monthyRent === OPTIONS.FALSE) {
      setMonthyRent(OPTIONS.TRUE) // true
    }
    if (monthyRent === OPTIONS.TRUE) {
      setMonthyRent(OPTIONS.FALSE) // false
    }
  }

  const handleChangeMonthyExpensesOptions = () => {
    if (monthyExpenses === OPTIONS.FALSE) {
      setMonthyExpenses(OPTIONS.TRUE) // true
    }
    if (monthyExpenses === OPTIONS.TRUE) {
      setMonthyExpenses(OPTIONS.FALSE) // false
    }
  }
  return (
    <section className="flex justify-between w-full max-w-6xl sm:flex-row flex-col">
      <form className="flex flex-col w-full mt-8" aria-label='renta vacacional calculator'>
        <div className="mb-6 flex-col flex">
          <label htmlFor='initialCapital' className="block mb-2 text-sm font-medium text-blue-primary">Inversión inicial</label>
          <input type='number' id='initialCapital' {...register('initialCapital')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='300000' />
          {errors.initialCapital && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.initialCapital.message}</span>}
          <label className="relative inline-flex items-center mt-6 cursor-pointer">
            <input type="checkbox" className="sr-only peer" onChange={handleChangeInitialCapitalOptions} value={initialCapitalOptions} />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm text-gray-900 dark:text-gray-300">Opciones Avanzadas</span>
          </label>
          {initialCapitalOptions === OPTIONS.TRUE && (
            <article className='flex flex-col w-full mt-4'>
              <ul>
                {
                  initialCapitalAdvancedDefaultOptions.map((option, index) => (
                    <li className='flex flex-row gap-3' key={index}>
                      <input type="text" id="advanced-option-1-name"
                        className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
                        placeholder={option.name} />
                      <input type='number' id='advanced-option-1-amount'
                        className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
                        placeholder={option.amount.toString()} />
                      <span id="advanced-option-1-percent"
                        className="mb-2 text-primary text-sm text-center flex items-center justify-center w-12">
                        {option.percent.toString()}
                      </span>
                      <DeleteAdvancedOption />
                    </li>
                  ))
                }
              </ul>
            </article>
          )}
        </div>
        <div className="mb-6 flex-col flex">
          <label htmlFor='monthyRent' className="block mb-2 text-sm font-medium text-blue-primary">Alquiler Mensual</label>
          <input type='number' id='monthyRent' {...register('monthyRent')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='300000' />
          {errors.monthyRent && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.monthyRent.message}</span>}
          <label className="relative inline-flex items-center mt-6 cursor-pointer">
            <input type="checkbox" className="sr-only peer" onChange={handleChangeMonthyRentOptions} value={monthyRent} />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm text-gray-900 dark:text-gray-300">Opciones Avanzadas</span>
          </label>
          {monthyRent === OPTIONS.TRUE && (
            <article className='flex flex-col w-full mt-4'>
              <ul>
                <li className='flex flex-col gap-3'>
                  <div>
                    <label htmlFor="pricePerNight" className="block mb-2 text-sm font-medium text-primary dark:text-white">Alquiler por noche</label>
                    <input type="number" id="pricePerNight"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
                      placeholder="200" />
                    {/* {errors.email && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email.message}</span>} */}
                  </div>
                  <div>
                    <label htmlFor="capacityPerMonth" className="block mb-2 text-sm font-medium text-primary dark:text-white">Ocupación por mes</label>
                    <input type="number" id="capacityPerMonth"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
                      placeholder="60" />
                    {/* {errors.email && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email.message}</span>} */}
                  </div>
                </li>
              </ul>
            </article>
          )}
        </div>
        <div className="mb-6 flex-col flex">
          <label htmlFor='rentedMonths' className="block mb-2 text-sm font-medium text-blue-primary">Cantidad de meses alquilado</label>
          <input type='number' id='rentedMonths' {...register('rentedMonths')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='11' />
          {errors.rentedMonths && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.rentedMonths.message}</span>}
        </div>
        <div className="mb-6 flex-col flex">
          <label htmlFor='maintenanceExpenses' className="block mb-2 text-sm font-medium text-blue-primary">Gastos mensuales</label>
          <input type='number' id='maintenanceExpenses' {...register('maintenanceExpenses')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='1600' />
          {errors.maintenanceExpenses && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.maintenanceExpenses.message}</span>}
          <label className="relative inline-flex items-center mt-6 cursor-pointer">
            <input type="checkbox" className="sr-only peer" onChange={handleChangeMonthyExpensesOptions} value={monthyExpenses} />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm text-gray-900 dark:text-gray-300">Opciones Avanzadas</span>
          </label>
          {monthyExpenses === OPTIONS.TRUE && (
            <article className='flex flex-col w-full mt-4'>
              <ul>
                {
                  monthyExpenseAdvancedDefaultOptions.map((option, index) => (
                    <li className='flex flex-row gap-3' key={index}>
                      <input type="text" id="monthy-expense-1-name"
                        className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
                        placeholder={option.name} />
                      <input type='number' id='monthy-expense-1-amount'
                        className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
                        placeholder={option.amount.toString()} />
                      <span id="monthy-expense-1-percent"
                        className="mb-2 text-primary text-sm text-center flex items-center justify-center w-12">
                        {option.percent.toString()}
                      </span>
                      <DeleteAdvancedOption />
                    </li>
                  ))
                }
              </ul>
            </article>
          )}
        </div>
        <button type="button"
          onClick={handleSubmit(onSubmit)}
          className="text-white w-full bg-secondary hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 font-medium rounded-lg
          text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600
          dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Calcular</button>
      </form>
      <div className="flex mt-8 sm:ml-10 w-full max-h-[500px]">
        <MetricCard metrics={metrics} />
      </div>
    </section>
  )
}
