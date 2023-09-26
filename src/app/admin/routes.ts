import { CalculatorIcon, RoleIcon, UserIcon } from "@/components/icons"
import { type Route } from "@/types/route"

const adminRoutes:Route[] = [
  {
    name: 'Usuarios',
    path: '/admin/users',
    Icon: UserIcon
  },
  {
    name: 'Roles',
    path: '/admin/roles',
    Icon: RoleIcon
  },
  {
    name: 'Calculadoras',
    path: '/admin/roles',
    Icon: CalculatorIcon
  }
]

export default adminRoutes