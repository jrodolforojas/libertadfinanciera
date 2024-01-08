import MultiLevelSidebar from '@/components/sidebar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type Database } from '@/types/entities/database'
import { getRoutes } from '@/app/routes'

export default async function SidebarServer() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data: { user: sessionUser } } = await supabase.auth.getUser()
  const { data: users } = await supabase.from('users').select('*, role:roles(id, name)').eq('auth_id', sessionUser?.id ?? '')
  const isFirstTime = users?.[0]?.is_first_time ?? true

  if (sessionUser === null || users === null || users.length !== 1 || isFirstTime) {
    return null
  }

  const user = {
    id: users[0].id,
    name: users[0].name,
    email: users[0].email,
    isActive: users[0].is_active,
    roleId: users[0].role_id ?? '',
    createdAt: users[0].created_at,
    role: {
      id: users[0].role?.id,
      name: users[0].role?.name
    }
  }

  const routes = getRoutes({ role: user.roleId })

  return <MultiLevelSidebar routes={routes} user={user} />
}
