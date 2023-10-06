import { type Route } from '@/types/route'
import { OpenSidebarMenuIcon } from '@/components/icons'
import Link from 'next/link'

export default function SidebarItem({ route }: {
  route: Route
}) {
  return (
    <div key={route.path}>
      {route.subRoutes && route.subRoutes.length > 0
        ? (
          <li>
            <button type="button" className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              aria-controls={`${route.name}-dropdown`}
              data-collapse-toggle={`${route.name}-dropdown`}>
              <span className="flex-1 ml-3 text-left whitespace-nowrap">{route.name}</span>
              <OpenSidebarMenuIcon />
            </button>
            <ul id={`${route.name}-dropdown`} className="hidden py-2 space-y-2">
              {route.subRoutes.map(subRoute => (
                <Link href={subRoute.path} key={subRoute.path} className="flex items-center w-full p-2 text-white
              transition duration-75 rounded-lg pl-11 group hover:bg-gray-800 dark:text-white
              dark:hover:bg-gray-700">
                  {subRoute.name}
                </Link>
              ))}
            </ul>
          </li>
          )
        : (
          <li>
            <Link href={route.path} className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group">
              <span className="ml-3">{route.name}</span>
            </Link>
          </li>
          )}
    </div>
  )
}
