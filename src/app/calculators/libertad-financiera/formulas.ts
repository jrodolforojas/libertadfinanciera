import { type FinancialFreedomCalculatorFormValues, type FinancialFreedomMetrics } from '@/types/form/financial-freedom'
import { type FinancialFreedomPassiveIncomeCalculatorFormValues, type FinancialFreedomPassiveIncomeMetrics } from '@/types/form/financial-freedom-passive-income'
import { type MetricCardValue } from '@/types/metric'
import { toTwoDecimals } from '@/utils/metrics-format'

function futureValueFormula(initialCapital: number, monthyInteresRate: number, yearsXMonth: number) {
  return initialCapital * Math.pow(1 + monthyInteresRate, yearsXMonth)
}

function geomSeries(z: number, m: number, n: number) {
  let amt
  if (z === 1.0) amt = n + 1
  else amt = (Math.pow(z, n + 1) - 1) / (z - 1)
  if (m >= 1) amt -= geomSeries(z, 0, m - 1)
  return amt
}

function calculateFutureValue(initialCapital: number, monthyInteresRate: number, yearsXMonth: number, monthyCapital: number) {
  if (monthyCapital == null) monthyCapital = 0

  return futureValueFormula(initialCapital, monthyInteresRate, yearsXMonth) +
    monthyCapital * geomSeries(1 + monthyInteresRate, 1, yearsXMonth)
}

function calculatePresentValue(futureValue: number, rate: number, years: number) {
  const presentValue = futureValue / Math.pow(1 + rate, years)
  return presentValue
}

function finalcialFreedomCalculate(input: FinancialFreedomCalculatorFormValues): FinancialFreedomMetrics {
  const { initialCapital, interesRateCompountInterest, interesRateSimpleInterest, inflation, years, mensualInvestment } = input
  const monthy = 12
  const anualInvestment = mensualInvestment * monthy
  const savingInvestment = anualInvestment * years + initialCapital
  const futureValue = calculateFutureValue(initialCapital, (interesRateCompountInterest / 100) / monthy, years * monthy, mensualInvestment)
  const savingAndFutureValueDifference = futureValue - savingInvestment
  const presentValue = calculatePresentValue(futureValue, inflation / 100, years)
  const passiveAnualIncome = presentValue * (interesRateSimpleInterest / 100)
  const passiveMonthyIncome = passiveAnualIncome / monthy

  const result: FinancialFreedomMetrics = {
    anualInvestment,
    savingInvestment,
    futureValue,
    savingAndFutureValueDifference,
    presentValue,
    passiveMonthyIncome,
    passiveAnualIncome
  }

  return result
}

export function onSubmitFinancialFreedomCalculatorForm(values: FinancialFreedomCalculatorFormValues): MetricCardValue[] {
  const financialFreedomMetrics = finalcialFreedomCalculate(values)

  const extraordinaryInvestment: FinancialFreedomMetrics = {
    anualInvestment: 0,
    savingInvestment: 0,
    futureValue: 0,
    savingAndFutureValueDifference: 0,
    presentValue: 0,
    passiveAnualIncome: 0,
    passiveMonthyIncome: 0
  }
  values.aditionals?.forEach((investment) => {
    let capital = 0
    if (investment.year > values.years) return

    if (investment.type === 'anual') capital = investment.value
    if (investment.type === 'semestral') capital = investment.value * 2
    if (investment.type === 'trimestral') capital = investment.value * 4

    const value: FinancialFreedomCalculatorFormValues = {
      initialCapital: capital,
      interesRateCompountInterest: values.interesRateCompountInterest,
      interesRateSimpleInterest: values.interesRateSimpleInterest,
      inflation: values.inflation,
      years: values.years - investment.year,
      mensualInvestment: values.mensualInvestment
    }

    const metrics = finalcialFreedomCalculate(value)
    extraordinaryInvestment.anualInvestment += metrics.anualInvestment
    extraordinaryInvestment.savingInvestment += metrics.savingInvestment
    extraordinaryInvestment.futureValue += metrics.futureValue
    extraordinaryInvestment.savingAndFutureValueDifference += metrics.savingAndFutureValueDifference
    extraordinaryInvestment.presentValue += metrics.presentValue
    extraordinaryInvestment.passiveAnualIncome += metrics.passiveAnualIncome
    extraordinaryInvestment.passiveMonthyIncome += metrics.passiveMonthyIncome
  })

  financialFreedomMetrics.anualInvestment += extraordinaryInvestment.anualInvestment
  financialFreedomMetrics.savingInvestment += extraordinaryInvestment.savingInvestment
  financialFreedomMetrics.futureValue += extraordinaryInvestment.futureValue
  financialFreedomMetrics.savingAndFutureValueDifference += extraordinaryInvestment.savingAndFutureValueDifference
  financialFreedomMetrics.presentValue += extraordinaryInvestment.presentValue
  financialFreedomMetrics.passiveAnualIncome += extraordinaryInvestment.passiveAnualIncome
  financialFreedomMetrics.passiveMonthyIncome += extraordinaryInvestment.passiveMonthyIncome

  const newMetrics: MetricCardValue[] = [
    {
      value: `$${toTwoDecimals(financialFreedomMetrics.anualInvestment)}`,
      label: 'Inversión Anual'
    },
    {
      value: `$${toTwoDecimals(financialFreedomMetrics.savingInvestment)}`,
      label: 'Si solamente lo ahorro'
    },
    {
      value: `$${toTwoDecimals(financialFreedomMetrics.futureValue)}`,
      label: 'Inversión con interés compuesto'
    },
    {
      value: `$${toTwoDecimals(financialFreedomMetrics.savingAndFutureValueDifference)}`,
      label: 'Diferencia entre inversión y ahorro'
    },
    {
      value: `$${toTwoDecimals(financialFreedomMetrics.presentValue)}`,
      label: 'Valor presente de la inversión (descontando la inflación)'
    },
    {
      value: `$${toTwoDecimals(financialFreedomMetrics.passiveAnualIncome)}`,
      label: 'Ingreso pasivo anual con interés simple'
    },
    {
      value: `$${toTwoDecimals(financialFreedomMetrics.passiveMonthyIncome)}`,
      label: 'Ingreso pasivo mensual con interés simple'
    }
  ]

  return newMetrics
}

function finalcialFreedomPassiveIncomeCalculate(input: FinancialFreedomPassiveIncomeCalculatorFormValues): FinancialFreedomPassiveIncomeMetrics {
  const { monthlyPassiveIncome, interestRate } = input
  const annualPassiveIncome = monthlyPassiveIncome * 12
  const investedCapital = annualPassiveIncome / (interestRate / 100)

  const result: FinancialFreedomPassiveIncomeMetrics = {
    annualPassiveIncome,
    investedCapital
  }

  return result
}

export function onSubmitFinancialFreedomPassiveIncomeCalculatorForm(values: FinancialFreedomPassiveIncomeCalculatorFormValues): MetricCardValue[] {
  const result = finalcialFreedomPassiveIncomeCalculate(values)
  const newMetrics: MetricCardValue[] = [
    {
      value: `$${toTwoDecimals(result.annualPassiveIncome)}`,
      label: 'Ingreso pasivo anual'
    },
    {
      value: `$${toTwoDecimals(result.investedCapital)}`,
      label: 'Capital invertido'
    }
  ]

  return newMetrics
}
