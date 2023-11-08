import { describe, test, expect, afterEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LargaEstanciaCalculator from './page'
import { type LargaEstanciaFormValues } from '@/types/form/larga-estancia'
import { onSubmitLargaEstancia } from './formulas'

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

    const result = onSubmitLargaEstancia(formValues)
    result.forEach(metric => {
      const { label, value } = metric
      const metricValue = screen.getByText(value)
      expect(metricValue).toBeDefined()

      const metricLabel = screen.getByText(label)
      expect(metricLabel).toBeDefined()
    })
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
  })

  afterEach(() => {
    cleanup()
  })
})
