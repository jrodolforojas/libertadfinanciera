'use client'

import { useState } from 'react'
import { SwitchIcon } from '@/components/icons'
import { type ExchangeRate } from '@/types/api/exchange-rate'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toTwoDecimals } from '@/utils/metrics-format'

const CURRENCIES = {
  CR: {
    name: 'Costa Rica',
    symbol: '₡',
    flag: '🇨🇷',
    currency: 'Colones'
  },
  USA: {
    name: 'Estados Unidos de América',
    symbol: '$',
    flag: '🇺🇸',
    currency: 'Dólares'
  }
}

const schema = yup.object().shape({
  input: yup.number()
    .required('El valor es un número requerido')
    .typeError('El valor debe ser un número')
    .min(1, 'Valor debe ser mayor o igual a 1')
    .max(999999999, 'Valor debe ser menor o igual a 999999999')
})

export default function ExchangeRateConversion({ rate }: {
  rate: ExchangeRate
}) {
  const [isBuy, setIsBuy] = useState(true)
  const [result, setResult] = useState(rate.buy)

  const { control, formState: { errors }, setValue } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleSwitch = () => {
    const newIsBuy = !isBuy
    const newResult = newIsBuy ? dollarToColones(result) : colonesToDollar(result)
    setValue('input', result)
    setResult(newResult)
    setIsBuy(newIsBuy)
  }

  const dollarToColones = (input: number) => {
    return input * rate.buy
  }

  const colonesToDollar = (input: number) => {
    return input / rate.sale
  }
  const calculate = (input: number) => {
    let conversion = 0
    if (isBuy) {
      conversion = input * rate.buy
    } else {
      conversion = input / rate.sale
    }
    return conversion
  }

  return (
    <section>
      <h3 className='text-2xl font-bold text-blue-text'>Conversión</h3>
      <div
        className='flex w-full items-center justify-between gap-x-8 mt-3 lg:flex-row flex-col'>
        <div className='w-full mb-6'>
          <div>
            <label htmlFor='exchange-rate-input' className="block mb-2 text-sm font-medium text-blue-primary">
              {isBuy
                ? `${CURRENCIES.USA.currency} ${CURRENCIES.USA.flag}`
                : `${CURRENCIES.CR.currency} ${CURRENCIES.CR.flag}`
              }
            </label>
            <div className='flex items-center justify-center'>
              <span className='mr-1 font-lg font-bold'>
                {isBuy
                  ? CURRENCIES.USA.symbol
                  : CURRENCIES.CR.symbol
                }
              </span>
              <Controller
                control={control}
                name='input'
                defaultValue={1}
                render={({ field }) => (
                  <input
                    id='exchange-rate-input'
                    type='number'
                    placeholder='1'
                    value={field.value}
                    min={0}
                    max={999999999}
                    maxLength={9}
                    onChange={(event) => {
                      const newValue = event.target.value !== '' ? Number(event.target.value) : ''
                      field.onChange(newValue)
                      const calculatedValue = newValue === '' ? 0 : newValue
                      const result = calculate(calculatedValue)
                      setResult(result)
                    }}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"/>
                )}
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleSwitch}
          className='text-secondary bg-primary p-2 rounded-md hover:text-primary hover:bg-secondary'>
          <SwitchIcon />
        </button>
        <div className='w-full mb-6'>
          <div>
            <label htmlFor={'exchange-rate-result'} className="block mb-2 text-sm font-medium text-blue-primary">
              {isBuy
                ? `${CURRENCIES.CR.currency} ${CURRENCIES.CR.flag}`
                : `${CURRENCIES.USA.currency} ${CURRENCIES.USA.flag}`
              }
            </label>
            <div className='flex items-center justify-center'>
              <span className='mr-1'>
                {isBuy
                  ? CURRENCIES.CR.symbol
                  : CURRENCIES.USA.symbol
                }
              </span>
              <input
                value={toTwoDecimals(result)}
                readOnly={true}
                type='text'
                id={'exchange-rate-result'}
                min={0}
                max={999999999}
                maxLength={9}
                className="relative shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
                placeholder={'1'} />
            </div>
          </div>
        </div>
      </div>
      {errors.input && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.input.message}</span>}
    </section>
  )
}
