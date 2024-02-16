import CrudContainer from '@/components/crud-container'
import Header from '@/components/header'
import TabsNavbar from '@/components/tabs-navbar'
import countries from '@/utils/countries'
export default async function TasaInteresCreditosLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <CrudContainer>
      <Header title="Tasa de interés" description="Para créditos hipotecarios">
        <TabsNavbar tabs={countries} route="/variables-macroeconomicas/tasa-interes-creditos/" />
      </Header>
      <section className="flex w-full">
        {children}
      </section>
    </CrudContainer>
  )
}
