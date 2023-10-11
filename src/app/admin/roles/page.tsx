import { createSupabaseClient } from '@/app/session'
import Container from '@/components/page-container'

export default async function Roles() {
  const supabase = createSupabaseClient()
  const { data: roles } = await supabase.from('role').select()
  return (
    <Container>
      <span>Roles</span>
      <pre>
        {
          JSON.stringify(roles, null, 2)
        }
      </pre>
    </Container>
  )
}
