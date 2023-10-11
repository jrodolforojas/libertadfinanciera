import MultiLevelSidebar from '@/components/sidebar'
import userRoutes from '@/app/routes'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function SidebarServer() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    return null
  }

  return <MultiLevelSidebar routes={userRoutes} user={user} />
}
