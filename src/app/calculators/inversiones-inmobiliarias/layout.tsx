import { isAuthenticated } from '@/app/session'
import Header from '@/components/header'
import Container from '@/components/page-container'
import { redirect } from 'next/navigation'

export default async function InversionesInmobiliariasLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await isAuthenticated()

  if (!session) {
    redirect('/login')
  }
  return (
    <Container>
      <Header title='Calculadora de Inversiones Inmobiliarias'>
      </Header>
      <section className='flex w-full'>
        {children}
      </section>
    </Container >
  )
}
