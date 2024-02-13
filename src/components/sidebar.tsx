'use client'

import { type Route } from '@/types/route'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { type User } from '@/types/user'
import SidebarV2 from './sidebar-v2'

export default function MultiLevelSidebar({ routes, user }: {
  routes: Route[]
  user: User
}) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  return (
    <SidebarV2 routes={routes} user={user} onSignOut={handleSignOut} />
  )
}
