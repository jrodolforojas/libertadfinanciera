'use client'

import { Tab } from '@/types/tab'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TabsNavbarItem({ tab, route }: {
  tab: Tab
  route: string
}) {

  const currentRoute = usePathname()
  const href = `${route}/${tab.id}`
  const isActive = currentRoute === href

  return (
    <Link href={`${route}/[id]`} as={href} className={`inline-block p-4 rounded-t-lg dark:bg-gray-800 dark:text-blue-500 hover:text-secondary ${isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
      <span>{tab.label} {tab.emoji && tab.emoji}</span>
    </Link>
  )
}