'use client'

import 'flowbite'
import { type Route } from '@/types/route'
import { LogoutIcon, MenuIcon } from '@/components/icons'
import SidebarItem from '@/components/sidebar-item'
import Avatar from '@/components/avatar'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function MultiLevelSidebar({ routes }: {
  routes: Route[]
}) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  return (
    <aside>
      <button
        data-drawer-target="sidebar"
        data-drawer-toggle="sidebar"
        aria-controls="sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <MenuIcon />
      </button>
      <nav
        id="sidebar"
        tabIndex={-1}
        className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-blue-primary flex-col justify-between flex">
          <blockquote>
            <Avatar />
            <ul className="space-y-2 font-medium pt-4 mt-4 border-t border-gray-400 dark:border-gray-700">
              {routes.map(route => (
                <SidebarItem route={route} key={route.path} />
              ))}
            </ul>
          </blockquote>
          <footer id="dropdown-cta" className="p-4 mt-6 rounded-lg" role="alert">
            <button onClick={handleSignOut} className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              <LogoutIcon />
              <span className='ml-2 text-white'>Cerrar Sesión</span>
            </button>
          </footer>
        </div>
      </nav>
    </aside>
  )
}
