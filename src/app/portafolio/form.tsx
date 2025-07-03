'use client'

import CrudContainer from '@/components/crud-container'
import { type Porfolio, type PortfolioFormValues } from '@/types/form/portfolio'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { portfolioSchema } from './schemas/porfolio-schema'
import { TrashIcon } from '@/components/icons'
import { Select, SelectItem } from '@tremor/react'
import { useState } from 'react'
import { toDollarCurrency, toTwoDecimals } from '@/utils/metrics-format'
import PortfolioPercentSpan from './components/porfolio-percent'
import Logo from '@/components/logo'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'
import { createClient } from '@/utils/supabase/client'
import { type Database } from '@/types/entities/database'

const columns = ['Objetivo', 'Plazo (meses)', 'Aporte Inicial', 'Aporte Mensual', 'Meses Invertidos', 'Valor de la inversión (hoy)',
  'Porcentaje del Portafolio', 'Tipo de interés', 'Rendimiento Promedio Anual', 'Acciones']

export default function PortfolioForm({ defaultPorfolio }: { defaultPorfolio: Porfolio }) {
  const [portfolio, setPortfolio] = useState(defaultPorfolio)
  const supabase = createClient()
  const router = useRouter()

  const savePortfolio = async () => {
    const userResponse = await supabase.auth.getUser()
    const { data: { user } } = userResponse
    const userId = user?.id ?? ''
    if (userId === '') return

    await supabase.from('portfolio_item').delete().eq('user_id', userId)

    const portfolioToSave = watch('investments')
    if (portfolioToSave == null) return

    portfolioToSave.forEach(async (investment) => {
      const { error } = await supabase.from('portfolio_item').insert({
        user_id: userId,
        goal: investment.goal,
        months: investment.months,
        initial_investment: investment.initialInvestment,
        monthly_investment: investment.monthlyInvestment,
        months_investment: investment.monthsInvestment,
        today_value: investment.todayValue,
        type: investment.type,
        anual_interest: investment.anualInterest
      })
      if (error !== null) {
        toast.error('Error al guardar el portafolio')
        router.refresh()
        router.replace('/portafolio')
      }
    })
    toast.success('Portafolio guardado correctamente')
    router.refresh()
    router.replace('/portafolio')
  }

  const handleOnSave = () => {
    savePortfolio()
  }

  const { control, register, watch } = useForm<PortfolioFormValues>({
    defaultValues: defaultPorfolio,
    resolver: yupResolver(portfolioSchema)
  })

  const { fields: investments, append, remove } = useFieldArray({
    control,
    name: 'investments'
  })

  const getTotalMonths = () => {
    const investments = watch('investments')
    let totalMonths = 0
    investments?.forEach(investment => {
      totalMonths += investment.months
    })
    return totalMonths
  }

  const getInitialInvestment = () => {
    const investments = watch('investments')
    let totalInitialInvestment = 0
    investments?.forEach(investment => {
      totalInitialInvestment += investment.initialInvestment
    })
    return totalInitialInvestment
  }
  const getMonthlyInvestment = () => {
    const investments = watch('investments')
    let totalMonthlyInvestment = 0
    investments?.forEach(investment => {
      totalMonthlyInvestment += investment.monthlyInvestment
    })
    return totalMonthlyInvestment
  }

  const getMonthsInvestment = () => {
    const investments = watch('investments')
    let totalMonthsInvestment = 0
    investments?.forEach(investment => {
      totalMonthsInvestment += investment.monthsInvestment
    })
    return totalMonthsInvestment
  }

  const getTodayValue = () => {
    const investments = watch('investments')
    let totalTodayValue = 0
    investments?.forEach(investment => {
      totalTodayValue += investment.todayValue
    })
    return totalTodayValue
  }

  const getAnualInterest = () => {
    const investments = watch('investments')
    if (investments?.length === 0) return 0
    let totalAnualInterest = 0
    investments?.forEach(investment => {
      totalAnualInterest += investment.anualInterest
    })
    const length = investments?.length ?? 1
    return totalAnualInterest / length
  }

  const updatePorfolio = () => {
    setPortfolio({
      ...portfolio,
      totalMonths: getTotalMonths(),
      totalInitialInvestment: getInitialInvestment(),
      totalMonthlyInvestment: getMonthlyInvestment(),
      totalMonthsInvestment: getMonthsInvestment(),
      totalTodayValue: getTodayValue(),
      totalAnualInterest: getAnualInterest()
    })
  }

  return (
    <CrudContainer>
      <header className="flex flex-col w-full">
        <div className="mb-5 flex flex-col items-center justify-center">
          <Logo />
          <h2 className="text-3xl font-bold text-center text-primary">Portafolio de inversiones</h2>
        </div>
      </header>
      <div className='flex items-center md:justify-end justify-center w-full gap-3'>
        <button className="flex self-end text-white bg-primary hover:bg-primary-light focus:ring-4 focus:outline-none
              focus:ring-primary-light font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5"
          onClick={() => {
            append({
              goal: 'Nuevo objetivo',
              months: 0,
              initialInvestment: 0,
              monthlyInvestment: 0,
              monthsInvestment: 0,
              todayValue: 0,
              type: 'compuesto',
              anualInterest: 0
            })
            updatePorfolio()
          }}
        >Agregar inversión</button>
        <button className="flex self-end text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none
              focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5"
          onClick={handleOnSave}
        >Guardar</button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-secondary uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map(column => (
                <th scope="col" key={`col-${column}`} className="px-6 py-3 text-center">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {investments?.map((investment, index) => (
              <tr key={investment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-primary">
                <td>
                  <div className='flex flex-col w-full p-2 text-center text-primary'>
                    <label htmlFor={`${investment.id}-goal`} className="sr-only">{`investments-${index}-goal`}</label>
                    <input
                      type="text"
                      placeholder='Libertad Financiera'
                      id={`${investment.id}-goal`}
                      {...register(`investments.${index}.goal` as const, { required: true })}
                      className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light" />
                  </div>
                </td>
                <td>
                  <div className='flex flex-col w-full p-2 text-center text-primary'>
                    <label htmlFor={`${investment.id}-months`} className="sr-only">{`investments-${index}-months`}</label>
                    <Controller control={control} name={`investments.${index}.months` as const} render={({ field }) => (
                      <input
                        type="number"
                        placeholder='240'
                        min={0}
                        id={`${investment.id}-months`}
                        value={field.value}
                        onChange={(event) => {
                          const amount = parseInt(event.target.value)
                          field.onChange(amount)
                          setPortfolio({
                            ...portfolio,
                            totalMonths: getTotalMonths()
                          })
                        }}
                        className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light" />
                    )} />
                  </div>
                </td>
                <td>
                  <div className='flex flex-col w-full p-2 text-center text-primary'>
                    <label htmlFor={`${investment.id}-initialInvestment`} className="sr-only">{`investments-${index}-initialInvestment`}</label>
                    <Controller control={control} name={`investments.${index}.initialInvestment` as const} render={({ field }) => (
                      <input
                        type="number"
                        placeholder='10000'
                        min={0}
                        id={`${investment.id}-initialInvestment`}
                        value={field.value}
                        onChange={(event) => {
                          const amount = parseInt(event.target.value)
                          field.onChange(amount)
                          setPortfolio({
                            ...portfolio,
                            totalInitialInvestment: getInitialInvestment()
                          })
                        }}
                        className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light" />
                    )} />
                  </div>
                </td>
                <td>
                  <div className='flex flex-col w-full p-2 text-center text-primary'>
                    <label htmlFor={`${investment.id}-monthlyInvestment`} className="sr-only">{`investments-${index}-monthlyInvestment`}</label>
                    <Controller control={control} name={`investments.${index}.monthlyInvestment` as const} render={({ field }) => (
                      <input
                        type="number"
                        placeholder='1000'
                        min={0}
                        id={`${investment.id}-monthlyInvestment`}
                        value={field.value}
                        onChange={(event) => {
                          const amount = parseInt(event.target.value)
                          field.onChange(amount)
                          setPortfolio({
                            ...portfolio,
                            totalMonthlyInvestment: getMonthlyInvestment()
                          })
                        }}
                        className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light" />
                    )} />
                  </div>
                </td>
                <td>
                  <div className='flex flex-col w-full p-2 text-center text-primary'>
                    <label htmlFor={`${investment.id}-monthsInvestment`} className="sr-only">{`investments-${index}-monthsInvestment`}</label>
                    <Controller control={control} name={`investments.${index}.monthsInvestment` as const} render={({ field }) => (
                      <input
                        type="number"
                        placeholder='1000'
                        min={0}
                        id={`${investment.id}-monthsInvestment`}
                        value={field.value}
                        onChange={(event) => {
                          const amount = parseInt(event.target.value)
                          field.onChange(amount)
                          setPortfolio({
                            ...portfolio,
                            totalMonthsInvestment: getMonthsInvestment()
                          })
                        }}
                        className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light" />
                    )} />
                  </div>
                </td>
                <td>
                  <div className='flex flex-col w-full p-2 text-center text-primary'>
                    <label htmlFor={`${investment.id}-todayValue`} className="sr-only">{`investments-${index}-todayValue`}</label>
                    <Controller control={control} name={`investments.${index}.todayValue` as const} render={({ field }) => (
                      <input
                        type="number"
                        placeholder='1000'
                        min={0}
                        id={`${investment.id}-todayValue`}
                        value={field.value}
                        onChange={(event) => {
                          const amount = parseInt(event.target.value)
                          field.onChange(amount)
                          setPortfolio({
                            ...portfolio,
                            totalTodayValue: getTodayValue()
                          })
                        }}
                        className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light" />
                    )} />
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-primary">
                  <PortfolioPercentSpan control={control} index={index} />
                </td>
                <td className="px-6 py-4 text-center text-primary mb-5">
                  <Controller control={control} name={`investments.${index}.type` as const} render={({ field }) => (
                    <Select value={field.value} onChange={field.onChange}>
                      <SelectItem value='simple'>Simple</SelectItem>
                      <SelectItem value='compuesto'>Compuesto</SelectItem>
                    </Select>
                  )} />
                </td>
                <td>
                  <div className='flex flex-col w-full p-2 text-center text-primary'>
                    <label htmlFor={`${investment.id}-anualInterest`} className="sr-only">{`investments-${index}-anualInterest`}</label>
                    <Controller control={control} name={`investments.${index}.anualInterest` as const} render={({ field }) => (
                      <input
                        type="number"
                        placeholder='1000'
                        min={0}
                        id={`${investment.id}-anualInterest`}
                        value={field.value}
                        onChange={(event) => {
                          const amount = parseInt(event.target.value)
                          field.onChange(amount)
                          setPortfolio({
                            ...portfolio,
                            totalAnualInterest: getAnualInterest()
                          })
                        }}
                        className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light" />
                    )} />
                  </div>
                </td>
                <td className="px-6 py-4 flex items-center justify-center gap-x-2">
                  <button className='text-primary hover:rounded-full p-2 hover:bg-secondary' onClick={() => {
                    remove(index)
                    updatePorfolio()
                  }}>
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="text-secondary uppercase bg-secondary dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="row" className="p-3 text-primary">Total</th>
              <td className="p-3 text-primary font-bold">{portfolio.totalMonths}</td>
              <td className="p-3 text-primary font-bold">{toDollarCurrency(portfolio.totalInitialInvestment)}</td>
              <td className="p-3 text-primary font-bold">{toDollarCurrency(portfolio.totalMonthlyInvestment)}</td>
              <td className="p-3 text-primary font-bold">{portfolio.totalMonthsInvestment}</td>
              <td className="p-3 text-primary font-bold">{toDollarCurrency(portfolio.totalTodayValue)}</td>
              <td className="p-3 text-primary font-bold"></td>
              <td className="p-3 text-primary font-bold"></td>
              <td className="p-3 text-primary font-bold">{toTwoDecimals(portfolio.totalAnualInterest)}%</td>
              <td className="p-3 text-primary font-bold"></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Toaster position="top-center" theme='dark' />
    </CrudContainer>
  )
}
