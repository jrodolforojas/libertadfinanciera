import { type Database } from '@/types/entities/database'
import { type User } from '@/types/user'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import UserForm from './form'
import { type Role } from '@/types/role'
import { cookies } from 'next/headers'

export default async function UserPage({ params }: { params: { id: string } }) {
  const { id } = params

  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data } = await supabase.from('roles').select()
  const { data: users } = await supabase.from('users').select('*, role:roles(id, name)').eq('id', id)

  const roles = data?.map(item => {
    const role: Role = {
      id: item.id,
      name: item.name,
      createdAt: new Date(item.created_at)
    }
    return role
  })

  let user: User = {
    id: 'new',
    name: '',
    email: '',
    isActive: false,
    roleId: '',
    createdAt: '',
    role: {
      id: '',
      name: ''
    }
  }

  if (users && users.length === 1) {
    user = {
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
  }

  return (
    <UserForm user={user} roles={roles} />
  )
}
