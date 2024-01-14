import './globals.css'
import type { Metadata } from 'next'
import SidebarServer from '@/components/sidebar-server'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Plataforma de la comunidad de alumnos de Roberto Olivas',
  description: 'Plataforma para la comunidad de alumno de Roberto Olivas en donde se encuentran recursos sobre los diferentes talleres.',
  themeColor: '#061B2C',
  creator: 'Jose Rodolfo Rojas',
  authors: {
    name: 'Jose Rodolfo Rojas',
    url: 'https://www.linkedin.com/in/jrodolforojas/'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className='bg-white'>
        <SidebarServer />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
