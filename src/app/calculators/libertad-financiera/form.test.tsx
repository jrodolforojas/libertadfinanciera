import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './form'
import { type FinancialFreedomCalculatorFormValues } from '@/types/form/financial-freedom'
import { onSubmitFinancialFreedomCalculatorForm } from './formulas'

describe('financial freedom calculator', () => {
  test('should calculate using placeholder values', async () => {
    const formValues: FinancialFreedomCalculatorFormValues = {
      initialCapital: 0,
      mensualInvestment: 1000,
      years: 20,
      interesRateCompountInterest: 10,
      interesRateSimpleInterest: 10,
      inflation: 4
    }
    const user = userEvent.setup()
    render(<Form />)
    const form = screen.getByRole('form', {
      name: 'finalcial freedom calculator'
    })
    expect(form).toBeDefined()

    const initialCapital = screen.getByRole('spinbutton', {
      name: 'Capital Inicial'
    })
    expect(initialCapital).toBeDefined()
    await user.type(initialCapital, formValues.initialCapital.toString())

    const mensualInvestment = screen.getByRole('spinbutton', {
      name: 'Inversión mensual'
    })
    expect(mensualInvestment).toBeDefined()
    await user.type(mensualInvestment, formValues.mensualInvestment.toString())

    const years = screen.getByRole('spinbutton', {
      name: 'Cantidad de años'
    })
    expect(years).toBeDefined()
    await user.type(years, formValues.years.toString())

    const interesRateCompountInterest = screen.getByRole('spinbutton', {
      name: 'Rendimiento promedio anual con Interés Compuesto'
    })
    expect(interesRateCompountInterest).toBeDefined()
    await user.type(interesRateCompountInterest, formValues.interesRateCompountInterest.toString())

    const interesRateSimpleInterest = screen.getByRole('spinbutton', {
      name: 'Rendimiento promedio anual con Interés Simple'
    })
    expect(interesRateSimpleInterest).toBeDefined()
    await user.type(interesRateSimpleInterest, formValues.interesRateSimpleInterest.toString())

    const inflation = screen.getByRole('spinbutton', {
      name: 'Promedio inflación histórica'
    })
    expect(inflation).toBeDefined()
    await user.type(inflation, formValues.inflation.toString())

    const calculateButton = screen.getByRole('button', {
      name: 'Calcular'
    })
    expect(calculateButton).toBeDefined()

    await user.click(calculateButton)

    const result = onSubmitFinancialFreedomCalculatorForm(formValues)
    result.forEach(metric => {
      const { label, value } = metric
      const metricValue = screen.getByText(value)
      expect(metricValue).toBeDefined()

      const metricLabel = screen.getByText(label)
      expect(metricLabel).toBeDefined()
    })
  })
  test('should calculate correctly when compount interest and simple interest are different', async () => {
    const formValues: FinancialFreedomCalculatorFormValues = {
      initialCapital: 0,
      mensualInvestment: 1000,
      years: 20,
      interesRateCompountInterest: 10,
      interesRateSimpleInterest: 12,
      inflation: 4
    }
    const user = userEvent.setup()
    render(<Form />)

    const initialCapital = screen.getByRole('spinbutton', {
      name: 'Capital Inicial'
    })
    expect(initialCapital).toBeDefined()
    await user.type(initialCapital, formValues.initialCapital.toString())

    const mensualInvestment = screen.getByRole('spinbutton', {
      name: 'Inversión mensual'
    })
    expect(mensualInvestment).toBeDefined()
    await user.type(mensualInvestment, formValues.mensualInvestment.toString())

    const years = screen.getByRole('spinbutton', {
      name: 'Cantidad de años'
    })
    expect(years).toBeDefined()
    await user.type(years, formValues.years.toString())

    const interesRateCompountInterest = screen.getByRole('spinbutton', {
      name: 'Rendimiento promedio anual con Interés Compuesto'
    })
    expect(interesRateCompountInterest).toBeDefined()
    await user.type(interesRateCompountInterest, formValues.interesRateCompountInterest.toString())

    const interesRateSimpleInterest = screen.getByRole('spinbutton', {
      name: 'Rendimiento promedio anual con Interés Simple'
    })
    expect(interesRateSimpleInterest).toBeDefined()
    await user.type(interesRateSimpleInterest, formValues.interesRateSimpleInterest.toString())

    const inflation = screen.getByRole('spinbutton', {
      name: 'Promedio inflación histórica'
    })
    expect(inflation).toBeDefined()
    await user.type(inflation, formValues.inflation.toString())

    const calculateButton = screen.getByRole('button', {
      name: 'Calcular'
    })
    expect(calculateButton).toBeDefined()

    await user.click(calculateButton)

    const result = onSubmitFinancialFreedomCalculatorForm(formValues)
    result.forEach(metric => {
      const { label, value } = metric
      const metricValue = screen.getByText(value)
      expect(metricValue).toBeDefined()

      const metricLabel = screen.getByText(label)
      expect(metricLabel).toBeDefined()
    })
  })
  test('should calculate based on initial capital and simple interest rate', async () => {
    const formValues: FinancialFreedomCalculatorFormValues = {
      initialCapital: 1000000,
      mensualInvestment: 0,
      years: 0,
      interesRateCompountInterest: 0,
      interesRateSimpleInterest: 18,
      inflation: 4
    }
    const user = userEvent.setup()
    render(<Form />)

    const initialCapital = screen.getByRole('spinbutton', {
      name: 'Capital Inicial'
    })
    expect(initialCapital).toBeDefined()
    await user.type(initialCapital, formValues.initialCapital.toString())

    const mensualInvestment = screen.getByRole('spinbutton', {
      name: 'Inversión mensual'
    })
    expect(mensualInvestment).toBeDefined()
    await user.type(mensualInvestment, formValues.mensualInvestment.toString())

    const years = screen.getByRole('spinbutton', {
      name: 'Cantidad de años'
    })
    expect(years).toBeDefined()
    await user.type(years, formValues.years.toString())

    const interesRateCompountInterest = screen.getByRole('spinbutton', {
      name: 'Rendimiento promedio anual con Interés Compuesto'
    })
    expect(interesRateCompountInterest).toBeDefined()
    await user.type(interesRateCompountInterest, formValues.interesRateCompountInterest.toString())

    const interesRateSimpleInterest = screen.getByRole('spinbutton', {
      name: 'Rendimiento promedio anual con Interés Simple'
    })
    expect(interesRateSimpleInterest).toBeDefined()
    await user.type(interesRateSimpleInterest, formValues.interesRateSimpleInterest.toString())

    const inflation = screen.getByRole('spinbutton', {
      name: 'Promedio inflación histórica'
    })
    expect(inflation).toBeDefined()
    await user.type(inflation, formValues.inflation.toString())

    const calculateButton = screen.getByRole('button', {
      name: 'Calcular'
    })
    expect(calculateButton).toBeDefined()

    await user.click(calculateButton)

    const result = onSubmitFinancialFreedomCalculatorForm(formValues)
    expect(screen.getAllByText('$0').length).toBe(result.filter(item => item.value === '$0').length)
    expect(screen.getAllByText('$1,000,000').length).toBe(result.filter(item => item.value === '$1,000,000').length)
    expect(screen.getByText('$180,000')).toBeDefined()
    expect(screen.getByText('$15,000')).toBeDefined()
  })
  test('should not display results until form is completed', async () => {
    const user = userEvent.setup()
    render(<Form />)

    const initialCapital = screen.getByRole('spinbutton', {
      name: 'Capital Inicial'
    })
    expect(initialCapital).toBeDefined()
    const mensualInvestment = screen.getByRole('spinbutton', {
      name: 'Inversión mensual'
    })
    expect(mensualInvestment).toBeDefined()
    const years = screen.getByRole('spinbutton', {
      name: 'Cantidad de años'
    })
    expect(years).toBeDefined()
    const interesRateCompountInterest = screen.getByRole('spinbutton', {
      name: 'Rendimiento promedio anual con Interés Compuesto'
    })
    expect(interesRateCompountInterest).toBeDefined()
    const interesRateSimpleInterest = screen.getByRole('spinbutton', {
      name: 'Rendimiento promedio anual con Interés Simple'
    })
    expect(interesRateSimpleInterest).toBeDefined()

    const inflation = screen.getByRole('spinbutton', {
      name: 'Promedio inflación histórica'
    })
    expect(inflation).toBeDefined()

    const calculateButton = screen.getByRole('button', {
      name: 'Calcular'
    })
    expect(calculateButton).toBeDefined()

    await user.click(calculateButton)

    const zeroResults = screen.getAllByText('0')
    expect(zeroResults.length).toBe(7)

    expect(screen.getByText('Capital inicial debe ser un valor numérico')).toBeDefined()
    expect(screen.getByText('Inversión mensual debe ser un valor numérico')).toBeDefined()
    expect(screen.getByText('Cantidad de años debe ser un valor numérico')).toBeDefined()
    expect(screen.getByText('Interés compuesto debe ser un valor numérico')).toBeDefined()
    expect(screen.getByText('Interés simple debe ser un valor numérico')).toBeDefined()
    expect(screen.getByText('Inflación debe ser un valor numérico')).toBeDefined()

    await user.type(initialCapital, '-1000')
    await user.type(mensualInvestment, '-1000')
    await user.type(years, '-1000')
    await user.type(interesRateCompountInterest, '-1000')
    await user.type(interesRateSimpleInterest, '-1000')
    await user.type(inflation, '-1000')

    expect(screen.getByText('Capital inicial debe ser mayor o igual a 0')).toBeDefined()
    expect(screen.getByText('Inversión mensual debe ser mayor o igual a 0')).toBeDefined()
    expect(screen.getByText('Cantidad de años debe ser mayor o igual a 0')).toBeDefined()
    expect(screen.getByText('Interés compuesto debe ser mayor o igual a 0')).toBeDefined()
    expect(screen.getByText('Interés simple debe ser mayor o igual a 0')).toBeDefined()
    expect(screen.getByText('Inflación debe ser mayor o igual a 0')).toBeDefined()
  })

  afterEach(() => {
    cleanup()
  })
})
