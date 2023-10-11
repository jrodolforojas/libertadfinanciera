import ComingSoon from '@/components/coming-soon'
import Container from '@/components/page-container'
import { isAuthenticated } from '@/app/session'
import { redirect } from 'next/navigation'

export default async function PortafolioPage() {
  const session = await isAuthenticated()

  if (!session) {
    redirect('/login')
  }
  return (
    <Container>
      <ComingSoon />
    </Container>
  )
}
