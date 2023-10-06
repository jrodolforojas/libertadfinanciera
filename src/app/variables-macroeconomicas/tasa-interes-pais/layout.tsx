import Header from '@/components/header'
import Container from '@/components/page-container'
import TabsNavbar from '@/components/tabs-navbar'
import countries from '@/utils/countries'

export default function TasaInteresPaisLayout({
  children
}: {
  children: React.ReactNode
}) {
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
