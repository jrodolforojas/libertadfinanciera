import { isAuthenticated } from '@/app/session'
import LoginForm from './form'
import { redirect } from 'next/navigation'

export default async function Login() {
  const session = await isAuthenticated()

  if (!session) {
    return <LoginForm />
  }
  redirect('/')
}
