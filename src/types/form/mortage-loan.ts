export interface MortageLoanCalculatorFormValues {
  price: number
  annualInterestRate: number
  durationInMonths: number
  loanImport: number
  startDate: Date
  prima: number
  monthlyPolicies: number
  administrativeExpenses: number
}

export interface MortageLoanCalculatorMetrics {
  monthlyPayment: number
  loanInstallment: number
  totalPayment: number
  totalMortagePayment: number
  totalInterest: number
  difference: number
}
