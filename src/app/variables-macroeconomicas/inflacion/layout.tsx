import countries from '@/utils/countries'
import TabsNavbar from '@/components/tabs-navbar'
import Header from '@/components/header'
import CrudContainer from '@/components/crud-container'

export default async function InflationLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <CrudContainer>
      <Header title="Tasa de inflación" description="Porcentaje de cuánto están subiendo los precios de las cosas que compramos cada día">
        <TabsNavbar tabs={countries} route="/variables-macroeconomicas/inflacion/" />
      </Header>
      <section className="flex w-full">
        {children}
      </section>
    </CrudContainer>
  )
}
