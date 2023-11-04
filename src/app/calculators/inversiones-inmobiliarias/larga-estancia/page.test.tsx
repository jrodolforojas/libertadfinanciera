import { describe, test, expect, afterEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LargaEstanciaCalculator from './page'
import { type LargaEstanciaMetric, type LargaEstanciaFormValues } from '@/types/form/larga-estancia'
import { calculateLargaEstancia } from './formulas'

describe('larga estancia calculator', () => {
  test('should calculate using placeholder values', async () => {
    const formValues: LargaEstanciaFormValues = {
      initialCapital: 300000,
      monthyRent: 1600,
      rentedMonths: 11,
      maintenanceExpenses: 1600
    }
    const user = userEvent.setup()
    render(<LargaEstanciaCalculator />)

    const form = screen.getByRole('form', {
      name: 'larga estancia calculator'
    })
    expect(form).toBeDefined()

    const initialCapital = screen.getByRole('spinbutton', {
      name: 'Inversión inicial'
    })
    expect(initialCapital).toBeDefined()
    await user.type(initialCapital, formValues.initialCapital.toString())

    const monthyRent = screen.getByRole('spinbutton', {
      name: 'Alquiler mensual'
    })
    expect(monthyRent).toBeDefined()
    await user.type(monthyRent, formValues.monthyRent.toString())

    const rentedMonths = screen.getByRole('spinbutton', {
      name: 'Cantidad de meses alquilado'
    })
    expect(rentedMonths).toBeDefined()
    await user.type(rentedMonths, formValues.rentedMonths.toString())

    const maintenanceExpenses = screen.getByRole('spinbutton', {
      name: 'Gastos de mantenimiento'
    })
    expect(maintenanceExpenses).toBeDefined()
    await user.type(maintenanceExpenses, formValues.maintenanceExpenses.toString())

    const calculateButton = screen.getByRole('button', {
      name: 'Calcular'
    })
    expect(calculateButton).toBeDefined()

    await user.click(calculateButton)

    const result = calculateLargaEstancia(formValues)
    const correctValues: LargaEstanciaMetric = {
      grossAnualIncome: 17600,
      taxes: 750,
      netAnualReturn: 15250,
      anualReturnPercent: 5,
      yearsToGetProfit: 20,
      monthyReturn: 1271
    }
    expect(result.grossAnualIncome.toFixed(0)).toEqual(correctValues.grossAnualIncome.toString())
    const anualInvestment = screen.getByText(`$ ${correctValues.grossAnualIncome}`)
    expect(anualInvestment).toBeDefined()

    expect(result.taxes.toFixed(0)).toEqual(correctValues.taxes.toString())
    const taxes = screen.getByText(`$ ${correctValues.taxes}`)
    expect(taxes).toBeDefined()

    expect(result.netAnualReturn.toFixed(0)).toEqual(correctValues.netAnualReturn.toString())
    const netAnualReturn = screen.getByText(`$ ${correctValues.netAnualReturn}`)
    expect(netAnualReturn).toBeDefined()

    const anualReturn = result.anualReturnPercent * 100
    expect(anualReturn.toFixed(0)).toEqual(correctValues.anualReturnPercent.toString())
    const anualReturnPercent = screen.getByText(`${correctValues.anualReturnPercent} %`)
    expect(anualReturnPercent).toBeDefined()

    expect(result.yearsToGetProfit.toFixed(0)).toEqual(correctValues.yearsToGetProfit.toString())
    const yearsToGetProfit = screen.getByText(correctValues.yearsToGetProfit)
    expect(yearsToGetProfit).toBeDefined()

    expect(result.monthyReturn.toFixed(0)).toEqual(correctValues.monthyReturn.toString())
    const monthyReturn = screen.getByText(`$ ${correctValues.monthyReturn}`)
    expect(monthyReturn).toBeDefined()
  })
  test('should not display results until form is completed', async () => {
    const user = userEvent.setup()
    render(<LargaEstanciaCalculator />)

    const form = screen.getByRole('form', {
      name: 'larga estancia calculator'
    })
    expect(form).toBeDefined()

    const initialCapital = screen.getByRole('spinbutton', {
      name: 'Inversión inicial'
    })
    expect(initialCapital).toBeDefined()

    const monthyRent = screen.getByRole('spinbutton', {
      name: 'Alquiler mensual'
    })
    expect(monthyRent).toBeDefined()

    const rentedMonths = screen.getByRole('spinbutton', {
      name: 'Cantidad de meses alquilado'
    })
    expect(rentedMonths).toBeDefined()

    const maintenanceExpenses = screen.getByRole('spinbutton', {
      name: 'Gastos de mantenimiento'
    })
    expect(maintenanceExpenses).toBeDefined()

    const calculateButton = screen.getByRole('button', {
      name: 'Calcular'
    })
    expect(calculateButton).toBeDefined()

    await user.click(calculateButton)

    const zeroResults = screen.getAllByText('0')
    expect(zeroResults.length).toBe(1)

    const zeroDollarResults = screen.getAllByText('$ 0')
    expect(zeroDollarResults.length).toBe(4)

    const zeroPercentResults = screen.getAllByText('0 %')
    expect(zeroPercentResults.length).toBe(1)

    expect(screen.getByText('Capital inicial debe ser un valor numérico')).toBeDefined()
    expect(screen.getByText('Alquiler mensual debe ser un valor numérico')).toBeDefined()
    expect(screen.getByText('Cantidad de meses alquilado debe ser un valor numérico')).toBeDefined()
    expect(screen.getByText('Gastos de mantenimiento debe ser un valor numérico')).toBeDefined()

    await user.type(initialCapital, '-1000')
    await user.type(monthyRent, '-1000')
    await user.type(rentedMonths, '-1000')
    await user.type(maintenanceExpenses, '-1000')

    expect(screen.getByText('Capital inicial debe ser mayor o igual a 0')).toBeDefined()
    expect(screen.getByText('Alquiler mensual debe ser mayor o igual a 0')).toBeDefined()
    expect(screen.getByText('Cantidad de meses alquilado debe ser mayor o igual a 0')).toBeDefined()
    expect(screen.getByText('Gastos de mantenimiento debe ser mayor o igual a 0')).toBeDefined()

    await user.type(rentedMonths, '15')
    expect(screen.getByText('Cantidad de meses alquilado debe como máximo 12')).toBeDefined()
  })

  afterEach(() => {
    cleanup()
  })
})
