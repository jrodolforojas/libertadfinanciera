import { redirect } from 'next/navigation'
import adminRoutes from './routes'
import MultiLevelSidebar from '@/components/sidebar'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function AdminLayout({
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
    <main>
      <MultiLevelSidebar routes={adminRoutes} />
      <section>{children}</section>
    </main>
  )
}
