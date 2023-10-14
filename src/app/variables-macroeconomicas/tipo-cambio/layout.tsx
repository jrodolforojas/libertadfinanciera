import Header from '@/components/header'
import Container from '@/components/page-container'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function TipoCambioLayout({
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
      <Header title="Tipo de cambio" description="dólar (USD) a colones (CRC)">
      </Header>
      <section className="flex w-full">
        {children}
      </section>
    </Container>
  )
}
