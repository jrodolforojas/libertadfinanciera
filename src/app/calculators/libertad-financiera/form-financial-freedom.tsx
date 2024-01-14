'use client'

import MetricCard from '@/components/metric-card'
import { type FinancialFreedomCalculatorFormValues } from '@/types/form/financial-freedom'
import { type MetricCardValue } from '@/types/metric'
import { type SubmitHandler, useForm, useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { onSubmitFinancialFreedomCalculatorForm } from './formulas'
import { useState } from 'react'
import { Select, SelectItem } from '@tremor/react'
import DeleteAdvancedOption from '../inversiones-inmobiliarias/renta-vacacional/components/delete-advanced-option'

const metricDefaultValues: MetricCardValue[] = [
  {
    value: '0',
    label: 'Inversión Anual'
  },
  {
    value: '0',
    label: 'Si solamente lo ahorro'
  },
  {
    value: '0',
    label: 'Inversión con interés compuesto'
  },
  {
    value: '0',
    label: 'Diferencia entre inversión y ahorro '
  },
  {
    value: '0',
    label: 'Valor presente de la inversión (descontando la inflación)'
  },
  {
    value: '0',
    label: 'Ingreso pasivo anual con interés simple'
  },
  {
    value: '0',
    label: 'Ingreso pasivo mensual con interés simple'
  }
]

const financialFreedomSchema = yup.object({
  initialCapital: yup.number()
    .typeError('Capital inicial debe ser un valor numérico')
    .required('Capital inicial es un campo requerido')
    .min(0, 'Capital inicial debe ser mayor o igual a 0'),
  mensualInvestment: yup.number()
    .typeError('Inversión mensual debe ser un valor numérico')
    .required('Inversión mensual es un campo requerido')
    .min(0, 'Inversión mensual debe ser mayor o igual a 0'),
  years: yup.number()
    .typeError('Cantidad de años debe ser un valor numérico')
    .required('Cantidad de años es un campo requerido')
    .min(0, 'Cantidad de años debe ser mayor o igual a 0')
    .max(500),
  interesRateCompountInterest: yup.number()
    .typeError('Interés compuesto debe ser un valor numérico')
    .required('Interés compuesto es un campo requerido')
    .min(0, 'Interés compuesto debe ser mayor o igual a 0'),
  interesRateSimpleInterest: yup.number()
    .typeError('Interés simple debe ser un valor numérico')
    .required('Interés simple es un campo requerido')
    .min(0, 'Interés simple debe ser mayor o igual a 0'),
  inflation: yup.number()
    .typeError('Inflación debe ser un valor numérico')
    .required('Inflación es un campo requerido')
    .min(0, 'Inflación debe ser mayor o igual a 0'),
  aditionals: yup.array().of(yup.object().shape({
    value: yup.number()
      .typeError('Monto adicional debe ser un valor numérico')
      .required('Monto adicional es un campo requerido')
      .min(0, 'Monto adicional debe ser mayor o igual a 0'),
    year: yup.number()
      .typeError('Año debe ser un valor numérico')
      .required('Año es un campo requerido')
      .min(0, 'Año debe ser mayor o igual a 0'),
    type: yup.string().required().oneOf(['anual', 'trimestral', 'semestral'], 'Tipo de aporte inválido')
  }))
})

const formDefaultValues: FinancialFreedomCalculatorFormValues = {
  initialCapital: 0,
  mensualInvestment: 0,
  years: 0,
  interesRateCompountInterest: 0,
  interesRateSimpleInterest: 0,
  inflation: 0,
  aditionals: []
}
export default function FinancialFreedomForm() {
  const { control, register, handleSubmit, formState: { errors } } = useForm<FinancialFreedomCalculatorFormValues>({
    defaultValues: formDefaultValues,
    resolver: yupResolver(financialFreedomSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'aditionals'
  })

  const [metrics, setMetrics] = useState<MetricCardValue[]>(metricDefaultValues)

  const [aditionals, setAditionals] = useState(0)

  const handleChangeAditionals = () => {
    if (aditionals === 0) setAditionals(1)
    if (aditionals === 1) setAditionals(0)
    fields.forEach((field, index) => {
      remove(index)
    })
  }

  const onSubmit: SubmitHandler<FinancialFreedomCalculatorFormValues> = (data) => {
    console.log({ extraordinaryInvestments: data.aditionals })
    const newMetrics = onSubmitFinancialFreedomCalculatorForm(data)
    setMetrics(newMetrics)
  }

  return (
    <section className="flex justify-between w-full max-w-6xl sm:flex-row flex-col">
      <form className="flex flex-col w-full mt-8" aria-label='finalcial freedom calculator'>
        <div className="mb-6">
          <label htmlFor='initialCapital' className="block mb-2 text-sm font-medium text-blue-primary">Capital Inicial</label>
          <input type='number' id='initialCapital' {...register('initialCapital')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='10000' />
          {errors.initialCapital && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.initialCapital.message}</span>}
        </div>
        <div className="mb-6">
          <label htmlFor='mensualInvestment' className="block mb-2 text-sm font-medium text-blue-primary">Inversión mensual</label>
          <input type='number' id='mensualInvestment' {...register('mensualInvestment')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='1000' />
          {errors.mensualInvestment && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.mensualInvestment.message}</span>}
        </div>
        <div className="mb-6">
          <label htmlFor='years' className="block mb-2 text-sm font-medium text-blue-primary">Cantidad de años</label>
          <input type='number' id='years' {...register('years')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='20' />
          {errors.years && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.years.message}</span>}
        </div>
        <div className="mb-6">
          <label htmlFor='interesRateCompountInterest' className="block mb-2 text-sm font-medium text-blue-primary">Rendimiento promedio anual con Interés Compuesto</label>
          <input type='number' id='interesRateCompountInterest' {...register('interesRateCompountInterest')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='10' />
          {errors.interesRateCompountInterest && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.interesRateCompountInterest.message}</span>}
        </div>
        <div className="mb-6">
          <label htmlFor='interesRateSimpleInterest' className="block mb-2 text-sm font-medium text-blue-primary">Rendimiento promedio anual con Interés Simple</label>
          <input type='number' id='interesRateSimpleInterest' {...register('interesRateSimpleInterest')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='10' />
          {errors.interesRateSimpleInterest && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.interesRateSimpleInterest.message}</span>}
        </div>
        <div>
          <label htmlFor='inflation' className="block mb-2 text-sm font-medium text-blue-primary">Promedio inflación histórica</label>
          <input type='number' id='inflation' {...register('inflation')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
            placeholder='4' />
          {errors.inflation && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.inflation.message}</span>}
        </div>
        <div className='mb-6 flex justify-between items-center w-full'>
          <label className="relative inline-flex items-center mt-6 cursor-pointer">
            <input type="checkbox" id='initialCapitalCheckbox' className="sr-only peer" onChange={handleChangeAditionals} value={aditionals} />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm text-primary dark:text-gray-300">Aportes extraordinarios</span>
          </label>
          {aditionals === 1 && (
            <button
              onClick={() => { append({ value: 5000, type: 'anual', year: 5 }) }}
              aria-label='add investment button'
              type="button"
              className="text-white bg-secondary-dark hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5">
              Agregar inversión
            </button>
          )}
        </div>
        {aditionals === 1 && (
          <ul className='mb-6'>
            {fields.map((aditional, index) => (
              <li key={index} className='flex w-full gap-3'>
                <div className='flex flex-col w-full'>
                  <label htmlFor={`${index}-value`} className="sr-only">{`option-${index}-value`}</label>
                  <input
                    type="text"
                    placeholder='Monto'
                    id={`${index}-value`}
                    {...register(`aditionals.${index}.value` as const, { required: true })}
                    className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light" />
                  {errors.aditionals?.[index] && <span className="text-sm text-red-600 dark:text-red-500">{errors.aditionals[index]?.value?.message}</span>}
                </div>
                <div className='flex flex-col w-full'>
                  <label htmlFor={`${index}-year`} className="sr-only">{`option-${index}-year`}</label>
                  <input
                    type="text"
                    placeholder='Año'
                    id={`${index}-year`}
                    {...register(`aditionals.${index}.year` as const, { required: true })}
                    className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light" />
                  {errors.aditionals?.[index] && <span className="text-sm text-red-600 dark:text-red-500">{errors.aditionals[index]?.year?.message}</span>}
                </div>
                <Controller control={control} name={`aditionals.${index}.type` as const} render={({ field }) => (
                  <Select value={field.value} onChange={field.onChange}>
                    <SelectItem value='anual'>Anual</SelectItem>
                    <SelectItem value='semestral'>Semestral</SelectItem>
                    <SelectItem value='trimestral'>Trimestral</SelectItem>
                  </Select>
                )} />
                <DeleteAdvancedOption id={index} onClick={() => {
                  remove(index)
                }} />
              </li>
            ))}
          </ul>
        )}
        <button type="button"
          className="text-white w-full bg-secondary hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 font-medium rounded-lg
          text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600
          dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleSubmit(onSubmit)}>Calcular</button>
      </form>
      <div className="flex mt-8 sm:ml-10 w-full max-h-[700px]">
        <MetricCard metrics={metrics} />
      </div>
    </section>
  )
}
