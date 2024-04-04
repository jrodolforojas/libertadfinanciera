import TabsNavbar from '@/components/tabs-navbar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { realStateInvestmentTypes } from './tabs'
import Logo from '@/components/logo'
import CrudContainer from '@/components/crud-container'

export default async function InversionesInmobiliariasLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }
  return (
    <CrudContainer>
      <Logo />
      <header className='flex flex-col w-full text-center max-w-6xl'>
        <h2 className="text-2xl font-bold mb-5 text-center text-primary dark:text-white mb-5">Calculadora de Inversiones Inmobiliarias</h2>
        <TabsNavbar tabs={realStateInvestmentTypes} route="/calculators/inversiones-inmobiliarias/" />
      </header>
      {children}
    </CrudContainer>
  )
}
