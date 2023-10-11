import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import MultiLevelSidebar from '@/components/sidebar'
import userRoutes from '@/app/routes'

export default async function SidebarServer() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    return null
  }

  return <MultiLevelSidebar routes={userRoutes} />
}
