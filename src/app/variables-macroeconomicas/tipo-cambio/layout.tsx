import Header from "@/components/header"
import Container from "@/components/page-container"
import TabsNavbar from "@/components/tabs-navbar"
import countries from "@/utils/countries"

export default function TipoCambioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      <Header title="Tipo de cambio" description="dólar (USD) a colones (CRC)">
      </Header>
      <section className="flex w-full">
        {children}
      </section>
    </Container>
  )
}