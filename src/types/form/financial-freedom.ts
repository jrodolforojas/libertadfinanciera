export interface FinancialFreedomCalculatorFormValues {
  initialCapital: number
  mensualInvestment: number
  years: number
  interesRateCompountInterest: number
  interesRateSimpleInterest: number
  inflation: number
}

export interface FinancialFreedomMetrics {
  anualInvestment: number
  savingInvestment: number
  futureValue: number
  savingAndFutureValueDifference: number
  presentValue: number
  passiveAnualIncome: number
  passiveMonthyIncome: number
}
