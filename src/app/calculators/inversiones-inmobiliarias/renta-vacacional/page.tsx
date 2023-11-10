'use client'

import { useState } from 'react'
import DeleteAdvancedOption from './components/delete-advanced-option'
import MetricCard from '@/components/metric-card'
import { type MetricCardValue } from '@/types/metric'
import { type SubmitHandler, useForm, useFieldArray, Controller } from 'react-hook-form'
import { type RentaVacacionalFormValues } from '@/types/form/renta-vacacional'
import { yupResolver } from '@hookform/resolvers/yup'
import { onSubmitRentaVacacional } from './formulas'
import { initialCapitalAdvancedDefaultOptions, monthyExpenseAdvancedDefaultOptions, rentaVacionalDefaultValues } from './default-values'
import useAdvancedOption from './hooks/useAdvancedOption'
import useSwitch from './hooks/useSwitch'
import { rentaVacacionalSchema } from './schemas/renta-vacacional-schema'
import PercentSpan from './components/percent'
import ExpensesPercentSpan from './components/expenses-percent'

export default function RentaVacacionalCalculator() {
  const { isSelected: isMonthlyRentSelected, isActive: isMonthlyRentActive, toggleValue: toggleMonthlyRent } = useSwitch()
  const {
    isSelected: initialCapitalToggle,
    isActive: isInitialCapitalsActive,
    toggleValue: toggleInitialCapital
  } = useAdvancedOption({ defaultValues: initialCapitalAdvancedDefaultOptions })

  const {
    isSelected: monthyExpenseToggle,
    isActive: isMonthlyExpenseActive,
    toggleValue: toggleMonthlyExpense
  } = useAdvancedOption({ defaultValues: monthyExpenseAdvancedDefaultOptions })

  const [metrics, setMetrics] = useState<MetricCardValue[]>(rentaVacionalDefaultValues)

  const { control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm<RentaVacacionalFormValues>({
    resolver: yupResolver(rentaVacacionalSchema)
  })

  const { fields: initialCapitalOptions, append, remove } = useFieldArray({
    control,
    name: 'initialCapitalOptions'
  })

  const { fields: maintenanceExpensesOptions, append: appendMaintenanceExpense, remove: removeMaintenanceExpense } = useFieldArray({
    control,
    name: 'maintenanceExpensesOptions'
  })

  const updateInitialCapitalSum = () => {
    let sum = 0
    const options = watch('initialCapitalOptions')
    if (options == null) {
      return 0
    }
    options.forEach(item => {
      sum += item.amount ?? 0
    })
    return sum
  }

  const updateMonthlyExpensesSum = () => {
    let sum = 0
    const options = watch('maintenanceExpensesOptions')
    if (options == null) {
      return 0
    }
    options.forEach(item => {
      sum += item.amount ?? 0
    })

    return sum
  }

  const updateMonthlyRent = () => {
    const options = watch('monthlyRentOptions')
    if (options == null) {
      return 0
    }
    const { capacityPerMonth, pricePerNight } = options
    if (!capacityPerMonth || !pricePerNight) {
      return 0
    }
    const capacityPerMonthPercent = capacityPerMonth / 100
    const monthlyRent = pricePerNight * capacityPerMonthPercent * 30
    return monthlyRent
  }

  const onSubmit: SubmitHandler<RentaVacacionalFormValues> = (data) => {
    const newMetrics = onSubmitRentaVacacional(data)
    setMetrics(newMetrics)
  }

  return (
    <section className="flex justify-between w-full max-w-6xl sm:flex-row flex-col">
      <form className="flex flex-col w-full mt-8" aria-label='renta vacacional calculator'>
        <div className="mb-6 flex-col flex">
          <label htmlFor='initialCapital' className="block mb-2 text-sm font-medium text-blue-primary">Inversión inicial</label>
          <input type='number' id='initialCapital' {...register('initialCapital')} disabled={isInitialCapitalsActive}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='300000' />
          {!isInitialCapitalsActive && errors.initialCapital && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.initialCapital.message}</span>}
          <label className="relative inline-flex items-center mt-6 cursor-pointer">
            <input type="checkbox" id='initialCapitalCheckbox' className="sr-only peer" onChange={toggleInitialCapital} value={initialCapitalToggle} />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm text-gray-900 dark:text-gray-300">Opciones Avanzadas</span>
          </label>
          {isInitialCapitalsActive && (
            <article className='flex flex-col w-full mt-4'>
              <button
                aria-label='add investment button'
                type="button"
                onClick={() => {
                  append({
                    name: '',
                    amount: 0
                  })
                  const newSum = updateInitialCapitalSum()
                  setValue('initialCapital', newSum)
                }}
                className="w-full text-white bg-secondary-dark hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-3">
                Agregar inversión
              </button>
              <ul aria-label='initial capital options'>
                {
                  initialCapitalOptions.map((option, index) => (
                    <li className='flex flex-row gap-3' key={index} aria-label={`option-${index}`}>
                      <div className='flex flex-col w-full'>
                        <label htmlFor={`${option.id}-name`} className="sr-only">{`option-${index}-name`}</label>
                        <input
                          type="text"
                          id={`${option.id}-name`}
                          {...register(`initialCapitalOptions.${index}.name` as const, { required: true })}
                          className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light" />
                        {errors.initialCapitalOptions?.[index] && <span className="text-sm text-red-600 dark:text-red-500">{errors.initialCapitalOptions[index]?.name?.message}</span>}
                      </div>
                      <div className='flex flex-col w-full'>
                        <label htmlFor={`${option.id}-amount`} className="sr-only">{`option-${index}-amount`}</label>
                        <Controller control={control} name={`initialCapitalOptions.${index}.amount` as const} render={({ field }) => (
                          <input
                            type='number'
                            id={`${option.id}-amount`}
                            value={field.value}
                            onChange={(event) => {
                              const amount = parseInt(event.target.value)
                              field.onChange(amount)
                              const newSum = updateInitialCapitalSum()
                              setValue('initialCapital', newSum)
                            }}
                            className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full max-w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light" />
                        )} />
                        {errors.initialCapitalOptions?.[index] && <span className="text-sm text-red-600 dark:text-red-500">{errors.initialCapitalOptions[index]?.amount?.message}</span>}
                      </div>
                      <PercentSpan control={control} index={index} />
                      <DeleteAdvancedOption id={index} onClick={() => {
                        remove(index)
                        const newSum = updateInitialCapitalSum()
                        setValue('initialCapital', newSum)
                      }} />
                    </li>
                  ))
                }
              </ul>
            </article>
          )}
        </div>
        <div className="mb-6 flex-col flex">
          <label htmlFor='monthyRent' className="block mb-2 text-sm font-medium text-blue-primary">Alquiler Mensual</label>
          <input type='number' id='monthyRent' {...register('monthyRent')} disabled={isMonthlyRentActive}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='300000' />
          {!isMonthlyRentSelected && errors.monthyRent && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.monthyRent.message}</span>}
          <label className="relative inline-flex items-center mt-6 cursor-pointer">
            <input type="checkbox" id='monthlyRentCheckbox' className="sr-only peer" onChange={() => {
              if (isMonthlyRentActive) {
                setValue('monthlyRentOptions.pricePerNight', 0)
                setValue('monthlyRentOptions.capacityPerMonth', 0)
              }
              toggleMonthlyRent()
            }} value={isMonthlyRentSelected} />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm text-gray-900 dark:text-gray-300">Opciones Avanzadas</span>
          </label>
          {isMonthlyRentActive && (
            <article className='flex flex-col w-full mt-4'>
              <ul>
                <li className='flex flex-col gap-3'>
                  <div>
                    <label htmlFor="pricePerNight" className="block mb-2 text-sm font-medium text-primary dark:text-white">Alquiler por noche</label>
                    <Controller control={control} name='monthlyRentOptions.pricePerNight' render={({ field }) => (
                      <input type="number" id="pricePerNight" value={field.value} onChange={(event) => {
                        const pricePerNight = parseInt(event.target.value)
                        field.onChange(pricePerNight)
                        const monthlyRent = updateMonthlyRent()
                        setValue('monthyRent', monthlyRent)
                      }}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
                        placeholder="200" />
                    )} />
                    {errors.monthlyRentOptions?.pricePerNight && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.monthlyRentOptions?.pricePerNight.message}</span>}
                  </div>
                  <div>
                    <label htmlFor="capacityPerMonth" className="block mb-2 text-sm font-medium text-primary dark:text-white">Ocupación por mes</label>
                    <Controller control={control} name='monthlyRentOptions.capacityPerMonth' render={({ field }) => (
                      <input type="number" id="capacityPerMonth" value={field.value} onChange={(event) => {
                        const capacityPerMonth = parseInt(event.target.value)
                        field.onChange(capacityPerMonth)
                        const monthlyRent = updateMonthlyRent()
                        setValue('monthyRent', monthlyRent)
                      }}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
                        placeholder="60" />
                    )} />
                    {errors.monthlyRentOptions?.capacityPerMonth && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.monthlyRentOptions?.capacityPerMonth.message}</span>}
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
          <input type='number' id='maintenanceExpenses' {...register('maintenanceExpenses')} disabled={isMonthlyExpenseActive}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='300000' />
          {!isMonthlyExpenseActive && errors.maintenanceExpenses && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.maintenanceExpenses.message}</span>}
          <label className="relative inline-flex items-center mt-6 cursor-pointer">
            <input type="checkbox" id='monthlyExpensesCheckbox' className="sr-only peer" onChange={toggleMonthlyExpense} value={monthyExpenseToggle} />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm text-gray-900 dark:text-gray-300">Opciones Avanzadas</span>
          </label>
          {isMonthlyExpenseActive && (
            <article className='flex flex-col w-full mt-4'>
              <button
                type="button"
                onClick={() => {
                  appendMaintenanceExpense({
                    name: '',
                    amount: 0
                  })
                }}
                className="w-full text-white bg-secondary-dark hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-3">
                Agregar gasto
              </button>
              <ul>
                {
                  maintenanceExpensesOptions.map((option, index) => (
                    <li className='flex flex-row gap-3' key={index}>
                      <div className='flex flex-col w-full'>
                        <input
                          type="text"
                          id={`${option.id}-name`}
                          {...register(`maintenanceExpensesOptions.${index}.name` as const, { required: true })}
                          className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light" />
                        {errors.maintenanceExpensesOptions?.[index] && <span className="text-sm text-red-600 dark:text-red-500">{errors.maintenanceExpensesOptions[index]?.name?.message}</span>}
                      </div>
                      <div className='flex flex-col w-full'>
                        <Controller control={control} name={`maintenanceExpensesOptions.${index}.amount` as const} render={({ field }) => (
                          <input
                            id={`${option.id}-amount`}
                            type='number'
                            value={field.value}
                            onChange={(event) => {
                              const amount = parseInt(event.target.value)
                              field.onChange(amount)
                              const newSum = updateMonthlyExpensesSum()
                              setValue('maintenanceExpenses', newSum)
                            }}
                            className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full max-w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light" />
                        )} />
                        {errors.maintenanceExpensesOptions?.[index] && <span className="text-sm text-red-600 dark:text-red-500">{errors.maintenanceExpensesOptions[index]?.amount?.message}</span>}
                      </div>
                      <ExpensesPercentSpan control={control} index={index} />
                      <DeleteAdvancedOption id={index} onClick={() => {
                        removeMaintenanceExpense(index)
                        const newSum = updateMonthlyExpensesSum()
                        setValue('maintenanceExpenses', newSum)
                      }} />
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
