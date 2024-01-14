'use client'

import { type Route } from '@/types/route'
import { BugIcon, HideSidebarIcon, LogoutIcon, MenuIcon } from '@/components/icons'
import SidebarItem from '@/components/sidebar-item'
import Avatar from '@/components/avatar'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type User } from '@/types/user'

export default function MultiLevelSidebar({ routes, user }: {
  routes: Route[]
  user: User
}) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  return (
    <aside>
      <button
        onClick={handleOpen}
        aria-controls="sidebar"
        type="button"
        className='inline-flex items-center p-2 my-2 ml-3 text-sm text-primary rounded-lg sm:hidden hover:bg-secondary
        focus:outline-none focus:ring-2 focus:ring-secondary hover:text-white'>
        <span className="sr-only">Open sidebar</span>
        <MenuIcon />
      </button>
      <nav
        id="sidebar"
        tabIndex={-1}
        className={`fixed top-0 left-0 z-40 w-72 sm:h-screen h-full bg-secondary transition-transform sm:translate-x-0 ${isOpen ? '' : '-translate-x-full'}`}
        aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-primary flex-col justify-between flex">
          <section className='mt-2'>
            <header className='flex items-center justify-end mb-2 sm:hidden'>
              <button onClick={handleOpen} className='p-3 hover:bg-gray-800 text-white rounded-full hover:text-gray-400'>
                <HideSidebarIcon />
              </button>
            </header>
            <Avatar name={user.name} role={user.role.name ?? ''} />
            <ul className="space-y-2 font-medium pt-4 mt-4 border-t border-gray-400 dark:border-gray-700">
              {routes.map(route => (
                <SidebarItem route={route} key={route.path} />
              ))}
            </ul>
          </section>
          <footer id="dropdown-cta" className="p-4 mt-6 rounded-lg" role="alert">
            <a href='https://chat.whatsapp.com/D19eRU3yBb1GAOQUCd5PAq' target="_blank" rel="noopener noreferrer" className="flex items-center w-full p-2 mb-5
             text-base text-white transition duration-75 rounded-lg group hover:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              <BugIcon />
              <span className='ml-2 text-white'>¿Encontraste un error?</span>
            </a>
            <a onClick={handleSignOut} className="flex items-center w-full p-2 cursor-pointer text-base text-white transition duration-75 rounded-lg group hover:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              <LogoutIcon />
              <span className='ml-2 text-white'>Cerrar Sesión</span>
            </a>
          </footer>
        </div>
      </nav>
    </aside>
  )
}
