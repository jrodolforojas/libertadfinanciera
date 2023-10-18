import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SignUpForm from './form'

export default async function SignUpPage({ params }: { params: { email: string } }) {
  const { email } = params
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session && email) {
    return <SignUpForm email={email} />
  }
  redirect('/404')
}
