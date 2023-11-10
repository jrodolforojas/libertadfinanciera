import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test } from 'vitest'
import RentaVacacionalCalculator from './page'
import { type RentaVacacionalFormValues } from '@/types/form/renta-vacacional'
import { onSubmitRentaVacacional } from './formulas'
import { rentaVacionalDefaultValues } from './default-values'
import { toTwoDecimals } from '@/utils/metrics-format'

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

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
  test('should work handling initial capital advanced settings', async () => {
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

    const checkboxes = screen.getAllByRole('checkbox', {
      name: 'Opciones Avanzadas'
    })
    expect(checkboxes.length).toBe(3)
    const initialCapitalAdvancedSettings = checkboxes[0]
    expect(initialCapitalAdvancedSettings).toBeDefined()
    await user.click(initialCapitalAdvancedSettings)

    expect(initialCapital).toHaveProperty('disabled', true)

    const initialCapitalOptions = screen.getByRole('list', {
      name: 'initial capital options'
    })
    expect(initialCapitalOptions).toBeDefined()
    expect(initialCapitalOptions.children.length).toBe(0) // no options added

    const addInvestmentButton = screen.getByRole('button', {
      name: 'add investment button'
    })
    expect(addInvestmentButton).toBeDefined()

    await user.click(addInvestmentButton)
    expect(initialCapitalOptions.children.length).toBe(1)
    const newInvestmentName = screen.getByRole('textbox', {
      name: `option-${0}-name`
    })
    expect(newInvestmentName).toBeDefined()

    const randomInvestmentName = crypto.randomUUID()
    await user.type(newInvestmentName, randomInvestmentName)

    const newInvestmentAmount = screen.getByRole('spinbutton', {
      name: `option-${0}-amount`
    })
    expect(newInvestmentAmount).toBeDefined()

    const randomAmount = randomIntFromInterval(1000, 10000)
    await user.type(newInvestmentAmount, randomAmount.toString())

    await user.click(addInvestmentButton)
    expect(initialCapitalOptions.children.length).toBe(2)
    const newInvestmentName2 = screen.getByRole('textbox', {
      name: `option-${1}-name`
    })
    expect(newInvestmentName2).toBeDefined()

    const randomInvestmentName2 = crypto.randomUUID()
    await user.type(newInvestmentName2, randomInvestmentName2)

    const newInvestmentAmount2 = screen.getByRole('spinbutton', {
      name: `option-${1}-amount`
    })
    expect(newInvestmentAmount2).toBeDefined()

    const randomAmount2 = randomIntFromInterval(1000, 10000)
    await user.type(newInvestmentAmount2, randomAmount2.toString())

    const sum = randomAmount + randomAmount2

    const optionOnePercent = (randomAmount / sum) * 100
    const optionTwoPercent = (randomAmount2 / sum) * 100

    // check percents
    expect(screen.getByText(`${toTwoDecimals(optionOnePercent)} %`)).toBeDefined()
    expect(screen.getByText(`${toTwoDecimals(optionTwoPercent)} %`)).toBeDefined()

    // remove second value and check percent
    const removeOptionTwoButton = screen.getByRole('button', {
      name: `delete-option-${1}`
    })
    expect(removeOptionTwoButton).toBeDefined()

    await user.click(removeOptionTwoButton)

    expect(initialCapitalOptions.children.length).toBe(1)
    const onlyOneElementPercent = (randomAmount / randomAmount) * 100
    expect(screen.getByText(`${toTwoDecimals(onlyOneElementPercent)} %`)).toBeDefined()
  })
  afterEach(() => {
    cleanup()
  })
})
