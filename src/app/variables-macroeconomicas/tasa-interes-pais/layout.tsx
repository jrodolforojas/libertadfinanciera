import CrudContainer from '@/components/crud-container'
import Header from '@/components/header'
import TabsNavbar from '@/components/tabs-navbar'
import countries from '@/utils/countries'

export default async function TasaInteresPaisLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <CrudContainer>
      <Header title="Tasa de interés" description="Por país">
        <TabsNavbar tabs={countries} route="/variables-macroeconomicas/tasa-interes-pais/" />
      </Header>
      <section className="flex w-full">
        {children}
      </section>
    </CrudContainer>
  )
}
