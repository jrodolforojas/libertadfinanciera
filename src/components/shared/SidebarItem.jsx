import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartLine, faWallet, faCalculator, faCartArrowDown, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'wouter'

library.add(faChartLine, faWallet, faCalculator, faCartArrowDown, faMoneyBill)

export const SidebarItem = ({ icon, name, path }) => {
  return (
    <Link href={path}>
      <li className='px-2 py-3 mb-2 rounded-full cursor-pointer hover:bg-slate-700'>
        <FontAwesomeIcon icon={icon} className='px-2' size='lg' color='#26D07B'/>
        <span className='ml-1 text-xl text-white'>{name}</span>
      </li>
    </Link>
  )
}
