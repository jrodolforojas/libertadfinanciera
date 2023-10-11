import MultiLevelSidebar from '@/components/sidebar'
import userRoutes from '@/app/routes'
import { isAuthenticated } from '@/app/session'

export default async function SidebarServer() {
  const session = await isAuthenticated()

  if (!session) {
    return null
  }

  return <MultiLevelSidebar routes={userRoutes} />
}
