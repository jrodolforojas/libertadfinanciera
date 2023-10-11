import { isAuthenticated } from '@/app/session'
import Header from '@/components/header'
import Container from '@/components/page-container'
import { redirect } from 'next/navigation'

export default async function TipoCambioLayout({
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
      <Header title="Tipo de cambio" description="dólar (USD) a colones (CRC)">
      </Header>
      <section className="flex w-full">
        {children}
      </section>
    </Container>
  )
}
