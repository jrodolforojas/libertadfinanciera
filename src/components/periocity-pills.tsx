'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function PeriocityPills() {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const defaultPeriocity = searchParams.get('periocity') ?? 'monthly'
  const [periocity, setPeriocity] = useState(defaultPeriocity)

  useEffect(() => {
    const requestUrl = new URL(location.origin + pathName + '?' + searchParams.toString())
    requestUrl.searchParams.set('periocity', periocity)
    router.push(requestUrl.toString())
  }, [periocity, router])
  return (
    <ul className='flex items-center justify-center w-full mt-4 mb-4'>
      <li onClick={() => { setPeriocity('monthly') }} className={`${periocity === 'monthly' ? 'bg-primary cursor-pointer text-white text-xs font-medium me-2 px-4 py-2 rounded-full' : 'bg-gray-100 cursor-pointer text-gray-800 text-xs font-medium me-2 px-4 py-2 rounded-full hover:bg-secondary hover:text-white'}`}>Mensual</li>
      <li onClick={() => { setPeriocity('quarterly') }} className={`${periocity === 'quarterly' ? 'bg-primary cursor-pointer text-white text-xs font-medium me-2 px-4 py-2 rounded-full' : 'bg-gray-100 cursor-pointer text-gray-800 text-xs font-medium me-2 px-4 py-2 rounded-full hover:bg-secondary hover:text-white'}`}>Trimestral</li>
      <li onClick={() => { setPeriocity('biannual') }} className={`${periocity === 'biannual' ? 'bg-primary cursor-pointer text-white text-xs font-medium me-2 px-4 py-2 rounded-full' : 'bg-gray-100 cursor-pointer text-gray-800 text-xs font-medium me-2 px-4 py-2 rounded-full hover:bg-secondary hover:text-white'}`}>Semestral</li>
      <li onClick={() => { setPeriocity('annual') }} className={`${periocity === 'annual' ? 'bg-primary cursor-pointer text-white text-xs font-medium me-2 px-4 py-2 rounded-full' : 'bg-gray-100 cursor-pointer text-gray-800 text-xs font-medium me-2 px-4 py-2 rounded-full hover:bg-secondary hover:text-white'}`}>Anual</li>
      <li onClick={() => { setPeriocity('quinquennium') }} className={`${periocity === 'quinquennium' ? 'bg-primary cursor-pointer text-white text-xs font-medium me-2 px-4 py-2 rounded-full' : 'bg-gray-100 cursor-pointer text-gray-800 text-xs font-medium me-2 px-4 py-2 rounded-full hover:bg-secondary hover:text-white'}`}>Quinquenio</li>
    </ul>
  )
}
