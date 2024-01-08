'use client'

import { useEffect, useState } from 'react'
import { SearchIcon } from './icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from 'use-debounce'

export default function SearchBar() {
  const [search, setSearch] = useState('')
  const [searchDebounced] = useDebounce(search, 500)

  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const requestUrl = new URL(location.origin + pathName + '?' + searchParams.toString())
    if (searchDebounced) {
      requestUrl.searchParams.set('user', searchDebounced)
      router.push(requestUrl.toString())
      return
    }
    requestUrl.searchParams.delete('user')
    router.push(requestUrl.toString())
  }, [searchDebounced, router])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  return (
    <div className='flex w-60'>
      <label htmlFor="simple-search" className="sr-only">Search</label>
      <div className="relative w-full">
        <div className="absolute px-2 py-2 text-gray-800">
          <SearchIcon />
        </div>
        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
          placeholder="Nombre..."
          value={search}
          onChange={handleSearch} />
      </div>
    </div>
  )
}
