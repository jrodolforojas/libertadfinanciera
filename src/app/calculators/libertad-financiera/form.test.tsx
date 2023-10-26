import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './form'
import { type FinancialFreedomMetrics, type FinancialFreedomCalculatorFormValues } from '@/types/form/financial-freedom'
import { finalcialFreedomCalculate } from './formulas'

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

    const result = finalcialFreedomCalculate(formValues)
    const correctValues: FinancialFreedomMetrics = {
      anualInvestment: 12000,
      savingInvestment: 240000,
      futureValue: 765697,
      savingAndFutureValueDifference: 525697,
      presentValue: 349454,
      passiveAnualIncome: 34945,
      passiveMonthyIncome: 2912
    }
    expect(result.anualInvestment.toFixed(0)).toEqual(correctValues.anualInvestment.toString())
    const anualInvestment = screen.getByText(`$ ${correctValues.anualInvestment}`)
    expect(anualInvestment).toBeDefined()

    expect(result.savingInvestment.toFixed(0)).toEqual(correctValues.savingInvestment.toString())
    const savingInvestment = screen.getByText(`$ ${correctValues.savingInvestment}`)
    expect(savingInvestment).toBeDefined()

    expect(result.futureValue.toFixed(0)).toEqual(correctValues.futureValue.toString())
    const futureValue = screen.getByText(`$ ${correctValues.futureValue}`)
    expect(futureValue).toBeDefined()

    expect(result.savingAndFutureValueDifference.toFixed(0)).toEqual(correctValues.savingAndFutureValueDifference.toString())
    const savingAndFutureValueDifference = screen.getByText(`$ ${correctValues.savingAndFutureValueDifference}`)
    expect(savingAndFutureValueDifference).toBeDefined()

    expect(result.presentValue.toFixed(0)).toEqual(correctValues.presentValue.toString())
    const presentValue = screen.getByText(`$ ${correctValues.presentValue}`)
    expect(presentValue).toBeDefined()

    expect(result.passiveAnualIncome.toFixed(0)).toEqual(correctValues.passiveAnualIncome.toString())
    const passiveAnualIncome = screen.getByText(`$ ${correctValues.passiveAnualIncome}`)
    expect(passiveAnualIncome).toBeDefined()

    expect(result.passiveMonthyIncome.toFixed(0)).toEqual(correctValues.passiveMonthyIncome.toString())
    const passiveMonthyIncome = screen.getByText(`$ ${correctValues.passiveMonthyIncome}`)
    expect(passiveMonthyIncome).toBeDefined()
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

    const result = finalcialFreedomCalculate(formValues)
    const correctValues: FinancialFreedomMetrics = {
      anualInvestment: 12000,
      savingInvestment: 240000,
      futureValue: 765697,
      savingAndFutureValueDifference: 525697,
      presentValue: 349454,
      passiveAnualIncome: 41934,
      passiveMonthyIncome: 3495
    }
    expect(result.anualInvestment.toFixed(0)).toEqual(correctValues.anualInvestment.toString())
    const anualInvestment = screen.getByText(`$ ${correctValues.anualInvestment}`)
    expect(anualInvestment).toBeDefined()

    expect(result.savingInvestment.toFixed(0)).toEqual(correctValues.savingInvestment.toString())
    const savingInvestment = screen.getByText(`$ ${correctValues.savingInvestment}`)
    expect(savingInvestment).toBeDefined()

    expect(result.futureValue.toFixed(0)).toEqual(correctValues.futureValue.toString())
    const futureValue = screen.getByText(`$ ${correctValues.futureValue}`)
    expect(futureValue).toBeDefined()

    expect(result.savingAndFutureValueDifference.toFixed(0)).toEqual(correctValues.savingAndFutureValueDifference.toString())
    const savingAndFutureValueDifference = screen.getByText(`$ ${correctValues.savingAndFutureValueDifference}`)
    expect(savingAndFutureValueDifference).toBeDefined()

    expect(result.presentValue.toFixed(0)).toEqual(correctValues.presentValue.toString())
    const presentValue = screen.getByText(`$ ${correctValues.presentValue}`)
    expect(presentValue).toBeDefined()

    expect(result.passiveAnualIncome.toFixed(0)).toEqual(correctValues.passiveAnualIncome.toString())
    const passiveAnualIncome = screen.getByText(`$ ${correctValues.passiveAnualIncome}`)
    expect(passiveAnualIncome).toBeDefined()

    expect(result.passiveMonthyIncome.toFixed(0)).toEqual(correctValues.passiveMonthyIncome.toString())
    const passiveMonthyIncome = screen.getByText(`$ ${correctValues.passiveMonthyIncome}`)
    expect(passiveMonthyIncome).toBeDefined()
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

    const result = finalcialFreedomCalculate(formValues)
    const correctValues: FinancialFreedomMetrics = {
      anualInvestment: 0,
      savingInvestment: 1000000,
      futureValue: 1000000,
      savingAndFutureValueDifference: 0,
      presentValue: 1000000,
      passiveAnualIncome: 180000,
      passiveMonthyIncome: 15000
    }

    expect(result.anualInvestment.toFixed(0)).toEqual(correctValues.anualInvestment.toString())
    expect(result.savingAndFutureValueDifference.toFixed(0)).toEqual(correctValues.savingAndFutureValueDifference.toString())
    const zeroResults = screen.getAllByText(`$ ${correctValues.anualInvestment}`)
    expect(zeroResults.length).toBe(2)

    expect(result.savingInvestment.toFixed(0)).toEqual(correctValues.savingInvestment.toString())
    expect(result.futureValue.toFixed(0)).toEqual(correctValues.futureValue.toString())
    expect(result.presentValue.toFixed(0)).toEqual(correctValues.presentValue.toString())
    const initialCapitalResults = screen.getAllByText(`$ ${correctValues.savingInvestment}`)
    expect(initialCapitalResults.length).toBe(3)

    expect(result.passiveAnualIncome.toFixed(0)).toEqual(correctValues.passiveAnualIncome.toString())
    const passiveAnualIncome = screen.getByText(`$ ${correctValues.passiveAnualIncome}`)
    expect(passiveAnualIncome).toBeDefined()

    expect(result.passiveMonthyIncome.toFixed(0)).toEqual(correctValues.passiveMonthyIncome.toString())
    const passiveMonthyIncome = screen.getByText(`$ ${correctValues.passiveMonthyIncome}`)
    expect(passiveMonthyIncome).toBeDefined()
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
