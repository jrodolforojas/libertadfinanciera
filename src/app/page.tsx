import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: { session } } = await supabase.auth.getSession()
  const { data: user } = await supabase.from('users').select('is_first_time').eq('auth_id', session?.user?.id ?? '')

  const isFirstTime = user?.[0]?.is_first_time ?? true
  if (!session) {
    redirect('/login')
  }

  if (isFirstTime) {
    redirect('/create-password')
  }

  return (
    <main className="h-screen bg-white">
      <section className="flex flex-col items-center justify-center text-center h-full w-full px-5 pt-8">
        <h1 className="text-3xl text-blue-primary font-bold text-center mb-5">Bienvenidos al taller</h1>
        <span className="text-center text-green-primary">¡Navega mediante el menú para conocer todos los recursos!</span>
      </section>
    </main>
  )
}
