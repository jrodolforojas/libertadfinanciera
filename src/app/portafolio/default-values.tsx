import { type Porfolio } from '@/types/form/portfolio'

export const investmentsDefaultValues: Porfolio = {
  investments: [
    {
      id: crypto.randomUUID(),
      goal: 'Libertad Financiera',
      months: 240,
      initialInvestment: 0,
      monthlyInvestment: 1000,
      monthsInvestment: 60,
      todayValue: 75424,
      type: 'compuesto',
      anualInterest: 9
    },
    {
      id: crypto.randomUUID(),
      goal: 'Comprar casa',
      months: 120,
      initialInvestment: 20000,
      monthlyInvestment: 500,
      monthsInvestment: 60,
      todayValue: 71624,
      type: 'compuesto',
      anualInterest: 10
    },
    {
      id: crypto.randomUUID(),
      goal: 'Comprar carro',
      months: 60,
      initialInvestment: 0,
      monthlyInvestment: 500,
      monthsInvestment: 60,
      todayValue: 37124,
      type: 'compuesto',
      anualInterest: 8
    }
  ],
  totalMonths: 420,
  totalInitialInvestment: 20000,
  totalMonthlyInvestment: 2000,
  totalMonthsInvestment: 180,
  totalTodayValue: 184172,
  totalAnualInterest: 9
}
