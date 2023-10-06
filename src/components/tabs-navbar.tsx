import TabsNavbarItem from "./tabs-navbar-item";
import { type Tab } from "@/types/tab"

export default function TabsNavbar({ tabs, route }: { tabs: Tab[], route: string }) {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-x-2">
      {tabs.map(tab => (
        <TabsNavbarItem tab={tab} route={route} />
      ))}
    </ul>
  )
}