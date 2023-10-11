import MultiLevelSidebar from '@/components/sidebar'
import userRoutes from '@/app/routes'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function SidebarServer() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return null
  }

  return <MultiLevelSidebar routes={userRoutes} />
}
