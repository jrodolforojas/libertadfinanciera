import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import SignUpForm from './form'

export default async function ForgotPasswordPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    return <SignUpForm />
  }
  redirect('/404')
}
