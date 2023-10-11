import countries from '@/utils/countries'
import TabsNavbar from '@/components/tabs-navbar'
import Container from '@/components/page-container'
import Header from '@/components/header'
import { isAuthenticated } from '@/app/session'
import { redirect } from 'next/navigation'

export default async function InflationLayout({
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
      <Header title="Tasa de inflación" description="Porcentaje de cuánto están subiendo los precios de las cosas que compramos cada día">
        <TabsNavbar tabs={countries} route="/variables-macroeconomicas/inflacion/" />
      </Header>
      <section className="flex w-full">
        {children}
      </section>
    </Container>
  )
}
