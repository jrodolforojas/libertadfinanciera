import CrudContainer from '@/components/crud-container'
import Header from '@/components/header'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function TipoCambioLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/login')
  }
  return (
    <CrudContainer>
      <Header title="Tipo de cambio" description="dólar (USD) a colones (CRC)" />
      <section className="flex w-full">
        {children}
      </section>
    </CrudContainer>
  )
}
