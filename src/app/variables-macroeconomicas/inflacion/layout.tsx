import countries from '@/utils/countries'
import TabsNavbar from '@/components/tabs-navbar'
import Container from '@/components/page-container'
import Header from '@/components/header'

export default function InflationLayout({
  children
}: {
  children: React.ReactNode
}) {
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
