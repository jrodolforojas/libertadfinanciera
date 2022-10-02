import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartLine, faWallet, faCalculator, faCartArrowDown, faMoneyBill } from '@fortawesome/free-solid-svg-icons'

library.add(faChartLine, faWallet, faCalculator, faCartArrowDown, faMoneyBill)

export const SidebarItem = ({ icon, name }) => {
  return (
    <li className='my-5 cursor-pointer'>
      <FontAwesomeIcon icon={icon} className='pr-4' size='lg' color='#26D07B'/>
      <span className='ml-1 text-xl text-white'>{name}</span>
    </li>
  )
}
