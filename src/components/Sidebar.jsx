import { SidebarItem } from './shared/SidebarItem'

export const Sidebar = () => {
  return (
    <nav className='w-72 h-screen bg-[#051C2C] p-5 pt-8 relative duration-300'>
      <h1 className='text-2xl font-bold text-white'>Libertad Financiera</h1>
      <ul>
        <SidebarItem icon='chart-line' name='Dashboard'/>
        <SidebarItem icon='wallet' name='Portafolio'/>
        <SidebarItem icon='calculator' name='Calculadoras'/>
        <SidebarItem icon='cart-arrow-down' name='Escaner'/>
      </ul>
    </nav>
  )
}
