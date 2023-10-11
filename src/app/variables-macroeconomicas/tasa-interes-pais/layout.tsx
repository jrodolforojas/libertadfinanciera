import { isAuthenticated } from '@/app/session'
import Header from '@/components/header'
import Container from '@/components/page-container'
import TabsNavbar from '@/components/tabs-navbar'
import countries from '@/utils/countries'
import { redirect } from 'next/navigation'

export default async function TasaInteresPaisLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await isAuthenticated()

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
