import TabsNavbar from '@/components/tabs-navbar'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { realStateInvestmentTypes } from './tabs'
import Logo from '@/components/logo'
import CrudContainer from '@/components/crud-container'

export default async function InversionesInmobiliariasLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/login')
  }
  return (
    <CrudContainer>
      <Logo />
      <header className='flex flex-col w-full text-center max-w-6xl'>
        <h2 className="text-2xl font-bold mb-5 text-center text-primary dark:text-white">Calculadora de Inversiones Inmobiliarias</h2>
        <TabsNavbar tabs={realStateInvestmentTypes} route="/calculators/inversiones-inmobiliarias/" />
      </header>
      {children}
    </CrudContainer>
  )
}
