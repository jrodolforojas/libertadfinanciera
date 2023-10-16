import { type Role } from '@/types/role'
import { type User } from '@/types/user'
import { Select, SelectItem, TextInput } from '@tremor/react'

export default function UserForm({ user, roles }: {
  user: User
  roles: Role[] | undefined
}) {
  return (
    <main className="flex flex-col justify-center items-center sm:px-20 px-10 sm:ml-64 sm:mt-5">
      <section className="flex w-full max-w-7xl items-center justify-between flex-col">
        <h3 className="font-bold text-md text-primary text-center">User: {user.id}</h3>
        <form className="flex flex-1 w-full items-start justify-start my-10 flex-col gap-y-4">
          <div className="w-full flex flex-col">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary dark:text-white">Correo electrónico</label>
            <TextInput placeholder="nuevo@finanzasconroberto.com" type="email" value={user.email} />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-primary dark:text-white">Nombre</label>
            <TextInput placeholder="Nombre..." type="text" value={user.name} />
          </div>
          <div className="w-full flex flex-col">
            <label className="block mb-2 text-sm font-medium text-primary dark:text-white">Estado</label>
            <label className="relative inline-flex items-center mb-2 cursor-pointer">
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-secondary-dark dark:peer-focus:ring-blue-800
              dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5
              after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{user.isActive ? 'Activo' : 'Inactivo'}</span>
            </label>
          </div>
          <div className="w-full flex flex-col">
            <label className="block mb-2 text-sm font-medium text-primary dark:text-white">Rol</label>
            {roles &&
              <Select value={user.role.id}>
                {
                  roles.map(role => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))
                }
              </Select>
            }
          </div>
        </form>
        <button type="button" className="w-full text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none
              focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-10">Guardar</button>
      </section>
    </main>
  )
}
