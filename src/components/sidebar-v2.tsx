'use client'

import { type Route } from '@/types/route'
import Link from 'next/link'
import { useState } from 'react'
import { Sidebar, Menu, MenuItem, type MenuItemStyles, SubMenu } from 'react-pro-sidebar'
import Avatar from '@/components/avatar'
import { type User } from '@/types/user'
import { BugIcon, LogoutIcon, MenuIcon } from './icons'

const menuItemStyles: MenuItemStyles = {
  root: {
    color: 'white',
    backgroundColor: '#061B2C',
    '&:hover': {
      backgroundColor: '#072238'
    }
  },
  SubMenuExpandIcon: {
    color: '#b6b7b9'
  },
  button: {
    color: 'white',
    backgroundColor: '#061B2C',
    '&:hover': {
      backgroundColor: 'rgb(31 41 55)'
    }
  }
}

export default function SidebarV2({ routes, user, onSignOut }: {
  routes: Route[]
  user: User
  onSignOut: () => void
}) {
  const [toggled, setToggled] = useState(false)
  const [broken, setBroken] = useState(true)

  const handleToggle = () => {
    setToggled(!toggled)
  }

  const closeOnClick = () => {
    if (broken) setToggled(false)
  }

  return (
    <div>
      {broken && (
        <button
          onClick={handleToggle}
          aria-controls="sidebar"
          type="button"
          className='inline-flex items-center p-2 my-2 ml-3 text-sm text-primary rounded-lg md:hidden hover:bg-secondary
        focus:outline-none focus:ring-2 focus:ring-secondary hover:text-white'>
          <span className="sr-only">Open sidebar</span>
          <MenuIcon />
        </button>
      )}
      <Sidebar
        collapsed={false}
        toggled={toggled}
        onBackdropClick={() => { setToggled(false) }}
        onBreakPoint={setBroken}
        backgroundColor='#061B2C'
        breakPoint="md"
        width='300px'
        rootStyles={{
          height: '100%',
          position: 'fixed',
          top: 0,
          left: broken ? '-300px' : 0,
          zIndex: 1000
        }}>
        <header className='my-5 mx-3 flex border-b border-gray-600'>
          <Avatar name={user.name} role={user.role.name ?? ''} />
        </header>
        <Menu
          closeOnClick={true}
          menuItemStyles={menuItemStyles}
        >
          {
            routes.map(route => (
              <div key={route.path}>
                {route.subRoutes && route.subRoutes.length > 0
                  ? (
                    <SubMenu label={route.name}>
                      {route.subRoutes.map(subRoute => (
                        <MenuItem key={subRoute.path} component={<Link href={subRoute.path} />} onClick={closeOnClick}>{subRoute.name}</MenuItem>
                      ))}
                    </SubMenu>
                    )
                  : (
                    <MenuItem key={route.path} component={<Link href={route.path} />} onClick={closeOnClick}>{route.name}</MenuItem>
                    )}
              </div>
            ))
          }
        </Menu>
        <Menu
          closeOnClick={true}
          menuItemStyles={menuItemStyles}>
          <div className='m-3 flex border-b border-gray-600' />
          <MenuItem key='report-issue' component={<Link href={'/report-bug'} />}>
            <div className='flex w-full text-white'>
              <BugIcon />
              <span className='ml-2 text-white'>Reportar Issue</span>
            </div>
          </MenuItem>
          <MenuItem key='sign-out' onClick={onSignOut}>
            <div className='flex w-full text-white'>
              <LogoutIcon />
              <span className='ml-2 text-white'>Cerrar Sesión</span>
            </div>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}
