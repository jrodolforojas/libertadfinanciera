import { type FinancialFreedomCalculatorFormValues, type FinancialFreedomMetrics } from '@/types/form/financial-freedom'

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

export function finalcialFreedomCalculate(input: FinancialFreedomCalculatorFormValues): FinancialFreedomMetrics {
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
