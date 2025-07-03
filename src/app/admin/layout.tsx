import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const adminRole: string = process.env.ADMINISTRATOR_ROLE_ID ?? ''
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: users } = await supabase.from('users').select('role_id')
    .eq('auth_id', user?.id ?? '')

  if (user === null) {
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
