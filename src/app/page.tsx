import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type Database } from '@/types/entities/database'
import DashboardMacroeconomicVariableCard from '@/components/dashboard-macroeconomic-variable-card'
import DashboardExchangeRate from '@/components/dashboard-exchange-rate'
import { getTodayExchangeRate } from '@/services/api/exchange-rates'
import { getTodayInflationRate } from '@/services/api/inflation-interest-rates'
import { type DashboardMetric } from '@/types/dahsboard-metric'
import { getTodayCreditInterestRate } from '@/services/api/credit-interest-rates'
import { FacebookIcon, InstagramIcon, LinkedInIcon, TiktokIcon, WebsiteIcon } from '@/components/icons'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data: { session } } = await supabase.auth.getSession()
  const { data: user } = await supabase.from('users').select('is_first_time,name').eq('auth_id', session?.user?.id ?? '')

  const isFirstTime = user?.[0]?.is_first_time ?? true

  if (session === null || user === null || user.length !== 1 || isFirstTime) {
    redirect('/login')
  }

  if (!session) {
    redirect('/login')
  }

  if (isFirstTime) {
    redirect('/create-password')
  }

  const fullName = user[0].name
  const name = fullName.split(' ')[0]

  const todayExchangeRate = await getTodayExchangeRate()

  const costaRicaInflationRate = await getTodayInflationRate({ country: 'cr' })
  const usaInflationRate = await getTodayInflationRate({ country: 'usa' })

  const inflationMetrics: DashboardMetric[] = [
    {
      value: costaRicaInflationRate.value,
      date: 'Tasa de inflación 🇨🇷',
      symbol: '%'
    },
    {
      value: usaInflationRate.value,
      date: 'Tasa de inflación 🇺🇸',
      symbol: '%'
    }
  ]

  const costaRicaCreditRate = await getTodayCreditInterestRate({ country: 'cr' })
  const usaCreditRate = await getTodayCreditInterestRate({ country: 'usa' })

  const creditMetrics: DashboardMetric[] = [
    {
      value: costaRicaCreditRate.value,
      date: 'Tasa Básica Pasiva',
      symbol: '%'
    },
    {
      value: usaCreditRate.value,
      date: 'New York Prime',
      symbol: '%'
    }
  ]

  return (
    <main className="flex flex-col justify-center items-center md:px-20 px-10 md:ml-64 md:mt-5 pb-10">
      <section className="flex w-full max-w-4xl items-center justify-center flex-col">
        <header className='flex flex-col w-full items-start'>
          <h1 className="text-3xl text-blue-primary font-bold text-center mb-2">¡Hola {name}!</h1>
          <p className='text-gray-600 text-sm text-pretty'>Te damos la bienvenida a la plataforma de herramientas de análisis de la <strong className='text-primary font-bold'>comunidad de alumnos de Roberto Olivas</strong>.</p>
        </header>
        <section className='flex flex-col w-full items-start mt-5'>
          <h3 className='text-2xl font-bold text-blue-text'>Variables Macroeconómicas de Hoy</h3>
          <DashboardMacroeconomicVariableCard
            title='Tasa de Inflación'
            metrics={inflationMetrics}
          />
          <div className='flex w-full flex-col gap-y-2'>
            <h3 className='text-lg font-bold text-blue-text mt-3 w-full text-center'>Tipo de Cambio</h3>
            <DashboardExchangeRate rate={todayExchangeRate} />
          </div>
          <DashboardMacroeconomicVariableCard
            title='Tasa de Créditos Hipotecarios'
            metrics={creditMetrics}
          />
        </section>
        <footer className='absolute bottom-0 sm:bg-white bg-primary max-h-20 p-3 w-full flex items-center justify-center text-gray-500 gap-x-3'>
          <a href='https://www.instagram.com/_robertoolivas/' title='Visitar Instagram' target='_blank' rel="noreferrer" className='sm:text-primary text-gray-500 hover:text-white'>
            <InstagramIcon />
          </a>
          <a href='https://www.facebook.com/asesorfinanciero.robertoolivas/' title='' target='_blank' rel="noreferrer" className='sm:text-primary text-gray-500 hover:text-white'>
            <FacebookIcon />
          </a>
          <a href='https://finanzasconrobertoolivas.com/' title='' target='_blank' rel="noreferrer" className='sm:text-primary text-gray-500 hover:text-white'>
            <WebsiteIcon />
          </a>
          <a href='https://www.tiktok.com/@finanzasconrobertoolivas' title='' target='_blank' rel="noreferrer" className='sm:text-primary text-gray-500 hover:text-white'>
            <TiktokIcon />
          </a>
          <a href='https://www.linkedin.com/in/roberto-olivas-24b93693/' title='' target='_blank' rel="noreferrer" className='sm:text-primary text-gray-500 hover:text-white'>
            <LinkedInIcon />
          </a>
        </footer>
      </section>
    </main>
  )
}
