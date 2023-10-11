import Container from '@/components/page-container'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Roles() {
  const supabase = createServerComponentClient({ cookies })
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
