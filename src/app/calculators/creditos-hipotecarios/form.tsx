'use client'

import { useState } from 'react'
import MetricCard from '@/components/metric-card'
import { type AmortizationTableItem } from '@/types/form/amortization-table'
import { type MortageLoanCalculatorMetrics, type MortageLoanCalculatorFormValues } from '@/types/form/mortage-loan'
import { type MetricCardValue } from '@/types/metric'
import { toDollarCurrency, toTwoDecimals } from '@/utils/metrics-format'
import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import { type SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { DatePicker, type DatePickerValue } from '@tremor/react'
import { es } from 'date-fns/locale'
import Logo from '@/components/logo'
import CrudContainer from '@/components/crud-container'
import MetricContainer from '@/components/metric-container'
import CalculatorContainer from '@/components/calculator-container'

const metricDefaultValues: MetricCardValue[] = [
  {
    value: '0',
    label: 'Pago mensual del préstamo'
  },
  {
    value: '0',
    label: 'Total de pagos*'
  },
  {
    value: '0',
    label: 'Total de pagos del préstamo'
  },
  {
    value: '0',
    label: 'Total intereses pagados'
  },
  {
    value: '0',
    label: 'Cantidad de veces que paga el préstamo'
  }
]

const formDefaultValues: MortageLoanCalculatorFormValues = {
  price: 0,
  annualInterestRate: 0,
  durationInMonths: 0,
  loanImport: 0,
  startDate: new Date(Date.now()),
  prima: 0,
  monthlyPolicies: 0,
  administrativeExpenses: 0
}

const schema = yup.object().shape({
  price: yup.number()
    .typeError('Precio debe ser un valor numérico')
    .required('Precio es un campo requerido')
    .min(0, 'Precio debe ser mayor o igual a 0')
    .max(999999999, 'Precio debe ser menor a 999999999'),
  annualInterestRate: yup.number()
    .typeError('Tasa interés anual debe ser un valor numérico')
    .required('Tasa interés anual es un campo requerido')
    .min(0, 'Tasa interés anual debe ser mayor o igual a 0')
    .max(100, 'Tasa interés anual debe ser menor o igual a 100'),
  durationInMonths: yup.number()
    .typeError('Duración debe ser un valor numérico')
    .required('Duración es un campo requerido')
    .min(0, 'Duración debe ser mayor o igual a 0')
    .max(100, 'Duración debe ser menor o igual a 100'),
  loanImport: yup.number()
    .typeError('Importe del préstamo debe ser un valor numérico')
    .required('Importe del préstamo es un campo requerido')
    .min(0, 'Importe del préstamo debe ser mayor o igual a 0')
    .max(999999999, 'Importe del préstamo debe ser menor a 999999999'),
  startDate: yup.date().required(),
  prima: yup.number()
    .typeError('Prima debe ser un valor numérico')
    .required('Prima es un campo requerido')
    .min(0, 'Prima debe ser mayor o igual a 0')
    .max(999999999, 'Prima debe ser menor a 999999999'),
  monthlyPolicies: yup.number()
    .typeError('Pólizas mensuales debe ser un valor numérico')
    .required('Pólizas mensuales es un campo requerido')
    .min(0, 'Pólizas mensuales debe ser mayor o igual a 0')
    .max(999999999, 'Pólizas mensuales debe ser menor a 999999999'),
  administrativeExpenses: yup.number()
    .typeError('Gastos administrativos debe ser un valor numérico')
    .required('Gastos administrativos es un campo requerido')
    .min(0, 'Gastos administrativos debe ser mayor o igual a 0')
    .max(999999999, 'Gastos administrativos debe ser menor a 999999999')
})
export default function CreditosHipotecariosCalculatorForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<MortageLoanCalculatorFormValues>({
    defaultValues: formDefaultValues,
    resolver: yupResolver(schema)
  })

  const [metrics, setMetrics] = useState<MetricCardValue[]>(metricDefaultValues)
  const [amortizationTable, setAmortizationTable] = useState<AmortizationTableItem[]>([])
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now()))

  const handleChangeStartDate = (newDate: DatePickerValue) => {
    if (newDate instanceof Date) setStartDate(newDate)
  }

  const getLoanInstallment = (data: MortageLoanCalculatorFormValues) => {
    const { loanImport, annualInterestRate, durationInMonths } = data
    const monthlyInterestRate = (annualInterestRate / 100) / 12
    const monthlyInstallment = loanImport / ((1 - (1 + monthlyInterestRate) ** -durationInMonths) / monthlyInterestRate)
    return monthlyInstallment
  }

  const getAmortizationTableItem = (data: MortageLoanCalculatorFormValues, monthlyPayment: number): AmortizationTableItem => {
    const { loanImport, annualInterestRate, monthlyPolicies, startDate, durationInMonths } = data
    const initialBalance = loanImport
    const monthlyInterestRate = (annualInterestRate / 100) / 12
    const interest = initialBalance * monthlyInterestRate
    const amortization = monthlyPayment - (interest + monthlyPolicies)
    const currentBalance = initialBalance - amortization

    return {
      initialBalance,
      interest,
      amortization,
      monthlyPayment,
      currentBalance,
      policies: monthlyPolicies,
      date: startDate,
      remainingPayments: durationInMonths - 1
    }
  }

  const getAmortizationTable = (data: MortageLoanCalculatorFormValues, monthlyPayment: number) => {
    const table: AmortizationTableItem[] = []
    const firstElement = getAmortizationTableItem(data, monthlyPayment)
    table.push(firstElement)

    for (let i = 1; i < data.durationInMonths; i++) {
      const previousElement = table[i - 1]
      const { currentBalance } = previousElement
      const monthlyInterestRate = (data.annualInterestRate / 100) / 12
      const interest = currentBalance * monthlyInterestRate
      const amortization = previousElement.monthlyPayment - (interest + previousElement.policies)
      let newBalance = currentBalance - amortization
      if (newBalance < 0) {
        newBalance = 0
      }
      const newElement: AmortizationTableItem = {
        initialBalance: currentBalance,
        interest,
        amortization,
        monthlyPayment,
        currentBalance: newBalance,
        policies: data.monthlyPolicies,
        date: new Date(new Date(previousElement.date).setMonth(previousElement.date.getMonth() + 1)),
        remainingPayments: data.durationInMonths - i - 1
      }
      table.push(newElement)
    }

    return table
  }
  const onSubmit: SubmitHandler<MortageLoanCalculatorFormValues> = (oldData) => {
    const data: MortageLoanCalculatorFormValues = {
      ...oldData,
      startDate
    }
    const { monthlyPolicies } = data
    const loanInstallment = getLoanInstallment(data)
    const monthlyPayment = loanInstallment + monthlyPolicies
    const amortizationTable = getAmortizationTable(data, monthlyPayment)
    setAmortizationTable(amortizationTable)

    let totalPayments = 0
    let totalInterest = 0
    let totalPrincipal = 0
    amortizationTable.forEach(item => {
      totalPayments += item.monthlyPayment
      totalInterest += item.interest
      totalPrincipal += item.amortization
    })

    const totalPaymentResult = totalPayments + data.prima + data.administrativeExpenses
    const result: MortageLoanCalculatorMetrics = {
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
      loanInstallment: isNaN(loanInstallment) ? 0 : loanInstallment,
      totalPayment: isNaN(totalPaymentResult) ? 0 : totalPaymentResult,
      totalMortagePayment: isNaN(totalInterest + totalPrincipal) ? 0 : totalInterest + totalPrincipal,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
      difference: isNaN(totalPaymentResult / data.loanImport) ? 0 : totalPaymentResult / data.loanImport
    }
    const newMetrics: MetricCardValue[] = [
      {
        value: `${toDollarCurrency(result.monthlyPayment)}`,
        label: 'Pago mensual del préstamo'
      },
      {
        value: `${toDollarCurrency(result.totalPayment)}`,
        label: 'Total de pagos*'
      },
      {
        value: `${toDollarCurrency(result.totalMortagePayment)}`,
        label: 'Total de pagos del préstamo'
      },
      {
        value: `${toDollarCurrency(result.totalInterest)}`,
        label: 'Total intereses pagados'
      },
      {
        value: `${toTwoDecimals(result.difference)}`,
        label: 'Cantidad de veces que paga el préstamo'
      }
    ]

    setMetrics(newMetrics)
  }

  const columns = ['N.º', 'Fecha de pago', 'Saldo inicial', 'Intereses', 'Principal', 'Seguros', 'Total pagos', 'Cierre saldo', 'N.º disponible']

  return (
    <CrudContainer>
      <Logo />
      <h2 className="text-2xl font-bold text-center text-primary dark:text-white mb-5">Calculadora de Créditos Hipotecarios</h2>
      <CalculatorContainer>
        <form className="flex flex-col w-full mt-2" aria-label='finalcial freedom calculator'>
          <div className="mb-6">
            <label htmlFor='price' className="block mb-2 text-sm font-medium text-blue-primary">Precio de compra ($)</label>
            <input type='number' id='price' {...register('price')}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
              placeholder='80000000' />
            {errors.price && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.price.message}</span>}
          </div>
          <div className="mb-6">
            <label htmlFor='annualInterestRate' className="block mb-2 text-sm font-medium text-blue-primary">Tasa de interés anual (%)</label>
            <input type='number' id='annualInterestRate' {...register('annualInterestRate')}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
              placeholder='10' />
            {errors.annualInterestRate && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.annualInterestRate.message}</span>}
          </div>
          <div className="mb-6">
            <label htmlFor='durationInMonths' className="block mb-2 text-sm font-medium text-blue-primary">Duración del préstamo (en meses)</label>
            <input type='number' id='durationInMonths' {...register('durationInMonths')}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
              placeholder='360' />
            {errors.durationInMonths && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.durationInMonths.message}</span>}
          </div>
          <div className="mb-6">
            <label htmlFor='loanImport' className="block mb-2 text-sm font-medium text-blue-primary">Importe del préstamo ($)</label>
            <input type='number' id='loanImport' {...register('loanImport')}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
              placeholder='72000000' />
            {errors.loanImport && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.loanImport.message}</span>}
          </div>
          <div className="mb-6">
            <label htmlFor='startDate' className="block mb-2 text-sm font-medium text-blue-primary">Fecha de inicio del préstamo ($)</label>
            <DatePicker id='startDate' enableYearNavigation={true} enableClear={false} locale={es} value={startDate} onValueChange={handleChangeStartDate} />
            {errors.startDate && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.startDate.message}</span>}
          </div>
          <div className="mb-6">
            <label htmlFor='prima' className="block mb-2 text-sm font-medium text-blue-primary">Prima ($)</label>
            <input type='number' id='prima' {...register('prima')}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
              placeholder='8000000' />
            {errors.prima && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.prima.message}</span>}
          </div>
          <div className="mb-6">
            <label htmlFor='monthlyPolicies' className="block mb-2 text-sm font-medium text-blue-primary">Pólizas mensuales (vida, incendio, desempleo) ($)</label>
            <input type='number' id='monthlyPolicies' {...register('monthlyPolicies')}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
              placeholder='55000' />
            {errors.monthlyPolicies && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.monthlyPolicies.message}</span>}
          </div>
          <div className="mb-6">
            <label htmlFor='administrativeExpenses' className="block mb-2 text-sm font-medium text-blue-primary">Gastos administrativos ($)</label>
            <input type='number' id='administrativeExpenses' {...register('administrativeExpenses')}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
              placeholder='2520000' />
            {errors.administrativeExpenses && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.administrativeExpenses.message}</span>}
          </div>
          <button type="button" onClick={handleSubmit(onSubmit)}
            className="text-white w-full bg-secondary hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 font-medium rounded-lg
          text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600
          dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Calcular</button>
        </form>
        <MetricContainer>
          <MetricCard metrics={metrics} />
        </MetricContainer>
      </CalculatorContainer>
      <section className='flex justify-between w-full max-w-6xl flex-col mt-8'>
        <h3 className='text-2xl font-bold text-blue-text mb-5'>Tabla de amortización</h3>
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
              {amortizationTable.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 text-center">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {format(item.date, 'dd/MM/yy')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {toDollarCurrency(item.initialBalance)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {toDollarCurrency(item.interest)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {toDollarCurrency(item.amortization)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {toDollarCurrency(item.policies)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {toDollarCurrency(item.monthlyPayment)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {toDollarCurrency(item.currentBalance)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.remainingPayments}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </CrudContainer>
  )
}
