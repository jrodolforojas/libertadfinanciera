'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TabsNavbarItem({ href, label }: {
  href: string
  label: string
}) {

  const currentRoute = usePathname()
  const isActive = currentRoute === href

  return (
    <Link href={href} className={`inline-block p-4 rounded-t-lg dark:bg-gray-800 dark:text-blue-500 hover:text-secondary ${isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
      {label}
    </Link>
  )
}