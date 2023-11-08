import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test } from 'vitest'
import RentaVacacionalCalculator from './page'
import { type RentaVacacionalFormValues } from '@/types/form/renta-vacacional'
import { onSubmitRentaVacacional } from './formulas'
import { rentaVacionalDefaultValues } from './default-values'

describe('renta vacacional calculator', () => {
  test('should work without advanced settings', async () => {
    const user = userEvent.setup()
    const formValues: RentaVacacionalFormValues = {
      initialCapital: 150000,
      monthyRent: 2700,
      rentedMonths: 12,
      maintenanceExpenses: 1505
    }
    render(<RentaVacacionalCalculator />)
    const form = screen.getByRole('form', {
      name: 'renta vacacional calculator'
    })
    expect(form).toBeDefined()

    const initialCapital = screen.getByRole('spinbutton', {
      name: 'Inversión inicial'
    })
    expect(initialCapital).toBeDefined()
    await user.type(initialCapital, formValues.initialCapital.toString())

    const monthyRent = screen.getByRole('spinbutton', {
      name: 'Alquiler Mensual'
    })
    expect(monthyRent).toBeDefined()
    await user.type(monthyRent, formValues.monthyRent.toString())

    const rentedMonths = screen.getByRole('spinbutton', {
      name: 'Cantidad de meses alquilado'
    })
    expect(rentedMonths).toBeDefined()
    await user.type(rentedMonths, formValues.rentedMonths.toString())

    const maintenanceExpenses = screen.getByRole('spinbutton', {
      name: 'Gastos mensuales'
    })
    expect(maintenanceExpenses).toBeDefined()
    await user.type(maintenanceExpenses, formValues.maintenanceExpenses.toString())

    const calculateButton = screen.getByRole('button', {
      name: 'Calcular'
    })
    expect(calculateButton).toBeDefined()

    await user.click(calculateButton)

    const result = onSubmitRentaVacacional(formValues)
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
    render(<RentaVacacionalCalculator />)
    const form = screen.getByRole('form', {
      name: 'renta vacacional calculator'
    })
    expect(form).toBeDefined()

    const initialCapital = screen.getByRole('spinbutton', {
      name: 'Inversión inicial'
    })
    expect(initialCapital).toBeDefined()

    const monthyRent = screen.getByRole('spinbutton', {
      name: 'Alquiler Mensual'
    })
    expect(monthyRent).toBeDefined()

    const rentedMonths = screen.getByRole('spinbutton', {
      name: 'Cantidad de meses alquilado'
    })
    expect(rentedMonths).toBeDefined()

    const maintenanceExpenses = screen.getByRole('spinbutton', {
      name: 'Gastos mensuales'
    })
    expect(maintenanceExpenses).toBeDefined()

    const calculateButton = screen.getByRole('button', {
      name: 'Calcular'
    })
    expect(calculateButton).toBeDefined()

    await user.click(calculateButton)

    expect(screen.getByText('Capital inicial debe ser un valor numérico')).toBeDefined()
    expect(screen.getByText('Alquiler mensual debe ser un valor numérico')).toBeDefined()
    expect(screen.getByText('Cantidad de meses alquilado debe ser un valor numérico')).toBeDefined()
    expect(screen.getByText('Gastos de mantenimiento debe ser un valor numérico')).toBeDefined()

    const negativeValue = -1000
    await user.type(initialCapital, negativeValue.toString())
    await user.type(monthyRent, negativeValue.toString())
    await user.type(rentedMonths, negativeValue.toString())
    await user.type(maintenanceExpenses, negativeValue.toString())

    expect(screen.getByText('Capital inicial debe ser mayor o igual a 0')).toBeDefined()
    expect(screen.getByText('Alquiler mensual debe ser mayor o igual a 0')).toBeDefined()
    expect(screen.getByText('Cantidad de meses alquilado debe ser mayor o igual a 0')).toBeDefined()
    expect(screen.getByText('Gastos de mantenimiento debe ser mayor o igual a 0')).toBeDefined()

    expect(screen.getAllByText('$ 0').length).toBe(rentaVacionalDefaultValues.filter(item => item.value === '$ 0').length)
    expect(screen.getAllByText('0 %').length).toBe(rentaVacionalDefaultValues.filter(item => item.value === '0 %').length)
    expect(screen.getAllByText('0').length).toBe(rentaVacionalDefaultValues.filter(item => item.value === '0').length)
  })
  afterEach(() => {
    cleanup()
  })
})
