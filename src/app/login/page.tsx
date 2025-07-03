import LoginForm from './form'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function Login() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user == null) {
    return <LoginForm />
  }
  redirect('/')
}
