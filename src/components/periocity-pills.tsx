'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const activeClass = 'bg-primary cursor-pointer text-white text-xs font-medium me-2 px-4 py-2 rounded-full'
const inactiveClass = 'bg-gray-100 cursor-pointer text-gray-800 text-xs font-medium me-2 px-4 py-2 rounded-full hover:bg-secondary hover:text-white'

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
    <div className='my-5 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5'>
      <button onClick={() => { setPeriocity('monthly') }} className={`${periocity === 'monthly' ? activeClass : inactiveClass}`}>Mensual</button>
      <button onClick={() => { setPeriocity('quarterly') }} className={`${periocity === 'quarterly' ? activeClass : inactiveClass}`}>Trimestral</button>
      <button onClick={() => { setPeriocity('biannual') }} className={`${periocity === 'biannual' ? activeClass : inactiveClass}`}>Semestral</button>
      <button onClick={() => { setPeriocity('annual') }} className={`${periocity === 'annual' ? activeClass : inactiveClass}`}>Anual</button>
      <button onClick={() => { setPeriocity('quinquennium') }} className={`${periocity === 'quinquennium' ? activeClass : inactiveClass}`}>Quinquenio</button>
    </div>
  )
}
