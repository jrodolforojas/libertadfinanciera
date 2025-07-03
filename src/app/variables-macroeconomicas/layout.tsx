import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function VariablesMacroeconomicasLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/login')
  }

  return (
    <>
      {children}
    </>
  )
}
