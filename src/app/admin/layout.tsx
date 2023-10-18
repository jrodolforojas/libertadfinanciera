import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Database } from '@/types/entities/database'

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const adminRole: string = process.env.ADMINISTRATOR_ROLE_ID ?? ''
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data: { session } } = await supabase.auth.getSession()
  const { data: users } = await supabase.from('users').select('role_id')
    .eq('auth_id', session?.user?.id ?? '')

  if (session === null) {
    redirect('/login')
  }

  if (users === null || users.length !== 1 || users[0].role_id !== adminRole) {
    notFound()
  }

  return (
    <main>
      <section>{children}</section>
    </main>
  )
}
