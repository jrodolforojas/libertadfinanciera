import Header from '@/components/header'
import Container from '@/components/page-container'
import TabsNavbar from '@/components/tabs-navbar'
import countries from '@/utils/countries'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function TasaInteresPaisLayout({
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
      <Header title="Tasa de interés" description="Por país">
        <TabsNavbar tabs={countries} route="/variables-macroeconomicas/tasa-interes-pais/" />
      </Header>
      <section className="flex w-full">
        {children}
      </section>
    </Container>
  )
}
