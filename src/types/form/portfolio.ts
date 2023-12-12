export interface PortfolioFormValues {
  investments?: InvestmentFormValues[]
}

export interface InvestmentFormValues {
  goal: string
  months: number
  initialInvestment: number
  monthlyInvestment: number
  monthsInvestment: number
  todayValue: number
  type: string
  anualInterest: number
}

export interface Porfolio {
  investments: Investment[]
  totalMonths: number
  totalInitialInvestment: number
  totalMonthlyInvestment: number
  totalMonthsInvestment: number
  totalTodayValue: number
  totalAnualInterest: number
}

export interface Investment {
  id: string
  goal: string
  months: number
  initialInvestment: number
  monthlyInvestment: number
  todayValue: number
  monthsInvestment: number
  type: 'compuesto' | 'simple'
  anualInterest: number
}
