import { routes } from '../navigator/routes'
import { SidebarItem } from './shared/SidebarItem'

export const Sidebar = () => {
  return (
    <nav className='w-72 h-screen bg-[#051C2C] p-5 pt-8 relative duration-300'>
      <h1 className='mb-5 text-2xl font-bold text-white'>Libertad Financiera</h1>
      <ul className=''>
        {routes.map(({ icon, name, path }, index) => <SidebarItem key={index} icon={icon} name={name} path={path}/>)}
      </ul>
    </nav>
  )
}
