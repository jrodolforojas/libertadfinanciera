import Container from '@/components/page-container'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <Container>
      <h1 className="text-3xl text-blue-primary font-bold text-center mb-5">Bienvenidos al taller</h1>
      <span className="text-center text-green-primary">¡Navega mediante el menú para conocer todos los recursos!</span>
    </Container>
  )
}
