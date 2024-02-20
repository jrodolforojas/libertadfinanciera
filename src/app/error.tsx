'use client'

import { BugIcon, FacebookIcon, InstagramIcon, LinkedInIcon, TiktokIcon, WebsiteIcon } from '@/components/icons'
import Link from 'next/link'

export default function Error() {
  return (
    <main className="flex flex-col justify-center items-center md:px-20 px-10 md:ml-64 md:mt-5 pb-10 bg-white">
      <section className="flex w-full max-w-4xl items-center justify-center flex-col mb-14">
        <header className='flex flex-col w-full items-start'>
          <h1 className="text-3xl text-blue-primary font-bold text-center mb-2">Ha ocurrido un error</h1>
          <p className='text-gray-600 text-sm text-pretty'>Ha habido un problema al obtener la información del <strong className='text-primary font-bold'>Banco Central de Costa Rica</strong>.</p>
          <Link href='/report-bug' className='mt-5'>
            <div className='flex w-full bg-primary text-white hover:bg-secondary p-4 rounded'>
              <BugIcon />
              <span className='ml-2'>Reportar Issue</span>
            </div>
          </Link>
        </header>
      </section>
      <footer className='fixed bottom-0 bg-primary max-h-20 p-3 flex items-center justify-center text-gray-500 gap-x-3 w-full'>
        <a href='https://www.instagram.com/_robertoolivas/' title='Visitar Instagram' target='_blank' rel="noreferrer" className='text-gray-500 hover:text-white'>
          <InstagramIcon />
        </a>
        <a href='https://www.facebook.com/asesorfinanciero.robertoolivas/' title='' target='_blank' rel="noreferrer" className='text-gray-500 hover:text-white'>
          <FacebookIcon />
        </a>
        <a href='https://finanzasconrobertoolivas.com/' title='' target='_blank' rel="noreferrer" className='text-gray-500 hover:text-white'>
          <WebsiteIcon />
        </a>
        <a href='https://www.tiktok.com/@finanzasconrobertoolivas' title='' target='_blank' rel="noreferrer" className='text-gray-500 hover:text-white'>
          <TiktokIcon />
        </a>
        <a href='https://www.linkedin.com/in/roberto-olivas-24b93693/' title='' target='_blank' rel="noreferrer" className='text-gray-500 hover:text-white'>
          <LinkedInIcon />
        </a>
      </footer>
    </main>
  )
}
