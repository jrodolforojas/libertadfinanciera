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

export default function RentaVacacionalCalculator() {
  const { isSelected: isMonthlyRentSelected, isActive: isMonthlyRentActive, toggleValue: toggleMonthlyRent } = useSwitch()
  const {
    isSelected: initialCapitalToggle,
    isActive: isInitialCapitalsActive,
    // options: initialCapitals,
    toggleValue: toggleInitialCapital
  } = useAdvancedOption({ defaultValues: initialCapitalAdvancedDefaultOptions })

  const {
    isSelected: monthyExpenseToggle,
    isActive: isMonthlyExpenseActive,
    options: monthlyExpenses,
    handleAddOption: handleAddMonthlyExpense,
    handleRemoveOption: handleRemoveMonthlyExpense,
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

  const updateInitialCapitalSum = () => {
    let sum = 0
    const options = watch('initialCapitalOptions')
    if (options == null) {
      return
    }
    options.forEach(item => {
      sum += item.amount ?? 0
    })
    return sum
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
            <input type="checkbox" className="sr-only peer" onChange={toggleInitialCapital} value={initialCapitalToggle} />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm text-gray-900 dark:text-gray-300">Opciones Avanzadas</span>
          </label>
          {isInitialCapitalsActive && (
            <article className='flex flex-col w-full mt-4'>
              <button
                type="button"
                onClick={() => {
                  append({
                    name: '',
                    amount: 0
                  })
                }}
                className="w-full text-white bg-secondary-dark hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-3">
                Agregar inversión
              </button>
              <ul>
                {
                  initialCapitalOptions.map((option, index) => (
                    <li className='flex flex-row gap-3' key={index}>
                      <div className='flex flex-col w-full'>
                        <input
                          type="text"
                          id={`${option.id}-name`}
                          {...register(`initialCapitalOptions.${index}.name` as const, { required: true })}
                          className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light" />
                        {errors.initialCapitalOptions?.[index] && <span className="text-sm text-red-600 dark:text-red-500">{errors.initialCapitalOptions[index]?.name?.message}</span>}
                      </div>
                      <div className='flex flex-col w-full'>
                        <Controller control={control} name={`initialCapitalOptions.${index}.amount` as const} render={({ field }) => (
                          <input
                            id={`${option.id}-amount`}
                            type='number'
                            value={field.value}
                            onChange={(event) => {
                              const amount = parseInt(event.target.value)
                              field.onChange(amount)
                              const newSum = updateInitialCapitalSum() ?? 0
                              setValue('initialCapital', newSum)
                            }}
                            className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full max-w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light" />
                        )} />
                        {errors.initialCapitalOptions?.[index] && <span className="text-sm text-red-600 dark:text-red-500">{errors.initialCapitalOptions[index]?.amount?.message}</span>}
                      </div>
                      <PercentSpan control={control} index={index} />
                      <DeleteAdvancedOption onClick={() => {
                        remove(index)
                        const newSum = updateInitialCapitalSum() ?? 0
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
          <input type='number' id='monthyRent' {...register('monthyRent')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='300000' />
          {errors.monthyRent && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.monthyRent.message}</span>}
          <label className="relative inline-flex items-center mt-6 cursor-pointer">
            <input type="checkbox" className="sr-only peer" onChange={toggleMonthlyRent} value={isMonthlyRentSelected} />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm text-gray-900 dark:text-gray-300">Opciones Avanzadas</span>
          </label>
          {isMonthlyRentActive && (
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
            <input type="checkbox" className="sr-only peer" onChange={toggleMonthlyExpense} value={monthyExpenseToggle} />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm text-gray-900 dark:text-gray-300">Opciones Avanzadas</span>
          </label>
          {isMonthlyExpenseActive && (
            <article className='flex flex-col w-full mt-4'>
              <button type="button" onClick={handleAddMonthlyExpense} className="w-full text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none
              focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-3">Agregar gasto</button>
              <ul>
                {
                  monthlyExpenses.map((option) => (
                    <li className='flex flex-row gap-3' key={option.id}>
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
                      <DeleteAdvancedOption onClick={() => { handleRemoveMonthlyExpense(option.id) }} />
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
