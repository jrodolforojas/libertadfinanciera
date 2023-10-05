import TabsNavbarItem from "./tabs-navbar-item";

export default function TabsNavbar() {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-x-2">
      <TabsNavbarItem href="/variables-macroeconomicas/inflacion/cr" label="Costa Rica 🇨🇷" />
      <TabsNavbarItem href="/variables-macroeconomicas/inflacion/us" label="Estados Unidos 🇺🇸" />
    </ul>
  )
}