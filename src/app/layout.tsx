import './globals.css'
import type { Metadata } from 'next'
import SidebarServer from '@/components/sidebar-server'

export const metadata: Metadata = {
  title: 'Libertad Financiera',
  description: 'Recursos del taller de Roberto Olivas'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SidebarServer />
        {children}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></script>
      </body>
    </html>
  )
}
