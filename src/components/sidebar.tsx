'use client'

import { type Route } from '@/types/route'
import { MenuIcon, OpenSidebarMenuIcon } from './icons'
import 'flowbite'

export default function MultiLevelSidebar({ routes }: {
  routes: Route[]
}) {
  return (
    <aside>
      <button data-drawer-target="sidebar" data-drawer-toggle="sidebar" aria-controls="sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <MenuIcon />
      </button>
      <nav id="sidebar" className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {routes.map(route => (
              <div key={route.path}>
                {route.subRoutes && route.subRoutes.length > 0 ? (
                  <li>
                    <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      aria-controls={`${route.name}-dropdown`}
                      data-collapse-toggle={`${route.name}-dropdown`}>
                      <span className="flex-1 ml-3 text-left whitespace-nowrap">{route.name}</span>
                      <OpenSidebarMenuIcon />
                    </button>
                    <ul id={`${route.name}-dropdown`} className="hidden py-2 space-y-2">
                      {route.subRoutes.map(subRoute => (
                        <li key={subRoute.path}>
                          <a href={subRoute.path} className="flex items-center w-full p-2 text-gray-900 
                          transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white 
                          dark:hover:bg-gray-700">{subRoute.name}</a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li>
                    <a href={route.path} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <span className="ml-3">{route.name}</span>
                    </a>
                  </li>
                )}
              </div>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  )
}