import { type Role } from '@/types/role'
import { createClient } from '@/utils/supabase/server'
import UploadMassiveUsersForm from './form'

const STUDENT_ROLE_NAME = 'Alumno'
export default async function UploadMassiveUsersPage() {
  const supabase = createClient()
  const { data } = await supabase.from('roles').select('*').eq('name', STUDENT_ROLE_NAME)

  const roles = data?.map(item => {
    const role: Role = {
      id: item.id,
      name: item.name,
      createdAt: new Date(item.created_at)
    }
    return role
  })

  if (roles == null) return null
  if (roles.length === 0) return null

  return (
    <UploadMassiveUsersForm role={roles[0]} />
  )
}
