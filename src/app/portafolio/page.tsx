import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import PortfolioForm from './form'
import { type Database } from '@/types/entities/database'
import { type PortfolioItem } from '@/types/entities/portfolio-item'
import { type Investment, type Porfolio } from '@/types/form/portfolio'
import { investmentsDefaultValues } from './default-values'

export default async function PortafolioPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const { data: portfolioDatabase } = await supabase.from('portfolio_item').select('*').returns<PortfolioItem[] | null>()

  const getPortfolio = (data: PortfolioItem[]): Porfolio => {
    const investments = data.map((item) => {
      const investment: Investment = {
        id: item.id,
        goal: item.goal,
        months: item.months ?? 0,
        initialInvestment: item.initial_investment ?? 0,
        monthlyInvestment: item.monthly_investment ?? 0,
        todayValue: item.today_value ?? 0,
        monthsInvestment: item.months_investment ?? 0,
        type: item.type === 'compuesto' ? 'compuesto' : 'simple',
        anualInterest: item.anual_interest ?? 0
      }
      return investment
    })

    const totalMonths = investments.reduce((acc, item) => acc + item.months, 0)
    const totalInitialInvestment = investments.reduce((acc, item) => acc + item.initialInvestment, 0)
    const totalMonthlyInvestment = investments.reduce((acc, item) => acc + item.monthlyInvestment, 0)
    const totalMonthsInvestment = investments.reduce((acc, item) => acc + item.monthsInvestment, 0)
    const totalTodayValue = investments.reduce((acc, item) => acc + item.todayValue, 0)
    const totalAnualInterest = investments.reduce((acc, item) => acc + item.anualInterest, 0) / investments.length

    const portfolio: Porfolio = {
      investments,
      totalMonths,
      totalInitialInvestment,
      totalMonthlyInvestment,
      totalMonthsInvestment,
      totalTodayValue,
      totalAnualInterest
    }

    return portfolio
  }

  let portfolio = getPortfolio(portfolioDatabase ?? [])
  if (portfolio.investments.length === 0) {
    portfolio = investmentsDefaultValues
  }

  return (
    <PortfolioForm defaultPorfolio={portfolio} />
  )
}
