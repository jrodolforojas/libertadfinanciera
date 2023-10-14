import countries from '@/utils/countries'
import TabsNavbar from '@/components/tabs-navbar'
import Container from '@/components/page-container'
import Header from '@/components/header'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function InflationLayout({
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
    <Container>
      <Header title="Tasa de inflación" description="Porcentaje de cuánto están subiendo los precios de las cosas que compramos cada día">
        <TabsNavbar tabs={countries} route="/variables-macroeconomicas/inflacion/" />
      </Header>
      <section className="flex w-full">
        {children}
      </section>
    </Container>
  )
}
