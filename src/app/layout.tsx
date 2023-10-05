import MultiLevelSidebar from '@/components/sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import userRoutes from './routes'
import Provider from './theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Libertad Financiera',
  description: 'Recursos del taller de Roberto Olivas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MultiLevelSidebar routes={userRoutes} />
        {children}
        <script src="node_modules/flowbite/dist/flowbite.min.js"></script>
      </body>
    </html>
  )
}
