import { EditIcon } from '@/components/icons'
import { type Database } from '@/types/entities/database'
import { type User } from '@/types/user'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { format } from 'date-fns'
import { cookies } from 'next/headers'
import Link from 'next/link'
import ActiveInactiveUser from './delete-user'
import CrudContainer from '@/components/crud-container'
import SearchBar from '@/components/search-bar'

const columns = ['Nombre', 'Correo Electrónico', 'Activo/Inactivo', 'Rol', 'Fecha de Creación', 'Acciones']

export default async function Users({ searchParams }: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const searchedUser = typeof searchParams.user === 'string' ? searchParams.user : ''
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data } = await supabase.from('users').select('*, role:roles(id, name)').ilike('name', `%${searchedUser}%`)

  const users = data?.map(item => {
    const user: User = {
      id: item.id,
      name: item.name,
      email: item.email,
      isActive: item.is_active,
      roleId: item.role_id ?? '',
      createdAt: format(new Date(item.created_at), 'dd/MM/yyyy'),
      role: {
        id: item.role?.id,
        name: item.role?.name
      }
    }
    return user
  })

  return (
    <CrudContainer>
      <header className="flex flex-col w-full mb-5">
        <h2 className="text-3xl font-bold text-center text-primary">Usuarios</h2>
      </header>
      <div className='flex w-full max-h-12 items-center justify-between mb-14 sm:mb-5 sm:flex-row flex-col gap-y-3'>
        <SearchBar />
        <Link href={'/admin/users/[id]'} as={'/admin/users/new'} className="text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none
              focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center">Crear usuario</Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-secondary uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map(column => (
                <th scope="col" key={`col-${column}`} className="px-6 py-3 text-center">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users?.map(user => (
              <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 text-center">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-center">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-center">
                  {user.isActive
                    ? (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Activo</span>
                    )
                    : (
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Inactivo</span>
                    )}
                </td>
                <td className="px-6 py-4 text-center">
                  {user.role.name}
                </td>
                <td className="px-6 py-4 text-center">
                  {user.createdAt}
                </td>
                <td className="px-6 py-4 flex items-center justify-center gap-x-2">
                  <Link href={'/admin/users/[id]'} as={`/admin/users/${user.id}`} className='text-primary hover:rounded-full p-2 hover:bg-secondary'>
                    <EditIcon />
                  </Link>
                  <ActiveInactiveUser userId={user.id} isActive={user.isActive} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CrudContainer>
  )
}
