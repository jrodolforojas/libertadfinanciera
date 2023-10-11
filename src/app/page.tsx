import Container from '@/components/page-container'
import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/app/session'

export default async function Home() {
  const session = await isAuthenticated()

  if (!session) {
    redirect('/login')
  }

  return (
    <Container>
      <h1 className="text-3xl text-blue-primary font-bold text-center mb-5">Bienvenidos al taller</h1>
      <span className="text-center text-green-primary">¡Navega mediante el menú para conocer todos los recursos!</span>
    </Container>
  )
}
