import MultiLevelSidebar from '@/components/sidebar'
import './globals.css'
import type { Metadata } from 'next'
import userRoutes from './routes'

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
        <MultiLevelSidebar routes={userRoutes} />
        {children}
        <script src="node_modules/flowbite/dist/flowbite.min.js"></script>
      </body>
    </html>
  )
}
