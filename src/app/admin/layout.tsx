import { redirect } from 'next/navigation'
import { isAuthenticated } from '../session'
import adminRoutes from './routes'
import MultiLevelSidebar from '@/components/sidebar'

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await isAuthenticated()

  if (!session) {
    redirect('/login')
  }
  return (
    <main>
      <MultiLevelSidebar routes={adminRoutes} />
      <section>{children}</section>
    </main>
  )
}
