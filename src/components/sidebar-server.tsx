import MultiLevelSidebar from '@/components/sidebar'
import userRoutes from '@/app/routes'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type Database } from '@/types/entities/database'

export default async function SidebarServer() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data: { user: sessionUser } } = await supabase.auth.getUser()
  const { data: users } = await supabase.from('users').select('*, role:roles(id, name)').eq('auth_id', sessionUser?.id ?? '')

  if (sessionUser === null || users === null || users.length !== 1) {
    return null
  }

  const user = {
    id: users[0].id,
    name: users[0].name,
    email: users[0].email,
    isActive: users[0].isActive,
    roleId: users[0].roleId ?? '',
    createdAt: users[0].created_at,
    role: {
      id: users[0].role?.id,
      name: users[0].role?.name
    }
  }

  return <MultiLevelSidebar routes={userRoutes} user={user} />
}
