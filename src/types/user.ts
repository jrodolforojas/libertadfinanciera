export interface User {
  id: string
  name: string
  email: string
  isActive: boolean
  createdAt: string
  roleId: string
  role: {
    id: string | undefined
    name: string | undefined
  }
}
