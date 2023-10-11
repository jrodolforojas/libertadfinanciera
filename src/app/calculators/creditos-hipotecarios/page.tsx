import { isAuthenticated } from '@/app/session'
import ComingSoon from '@/components/coming-soon'
import Container from '@/components/page-container'
import { redirect } from 'next/navigation'

export default function CreditosHipotecariosCalculator() {
  const session = isAuthenticated()

  if (!session) {
    redirect('/login')
  }
  return (
    <Container>
      <ComingSoon />
    </Container>
  )
}
