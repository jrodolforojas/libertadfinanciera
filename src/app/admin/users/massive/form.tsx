'use client'

import { TrashIcon, UploadIcon } from '@/components/icons'
import { type Role } from '@/types/role'
import { type User } from '@/types/user'
import { useState, type ChangeEvent } from 'react'
import { Toaster, toast } from 'sonner'
import * as XLSX from 'xlsx'

interface ExcelData {
  correo: string
  nombre: string
}

const columns = ['Nombre', 'Correo Electrónico', 'Activo/Inactivo', 'Rol', 'Acciones']

export default function UploadMassiveUsersForm({ role }: { role: Role }) {
  const [usersToUpload, setUsersToUpload] = useState<User[]>([])

  const handleRemoveUser = (email: string) => {
    const filteredUsers = usersToUpload.filter(user => user.email !== email)
    setUsersToUpload(filteredUsers)
  }
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file == null) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result

      if (typeof data === 'string') {
        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json<ExcelData>(sheet)

        const excelUsers = jsonData.map((user) => ({
          email: user.correo,
          name: user.nombre
        })).filter(user => user.email !== '' && user.name !== '')

        const requiredFieldsAreMissing = excelUsers.some(user => user.email === undefined || user.name === undefined)

        if (requiredFieldsAreMissing) {
          toast.error('El archivo no contiene los campos requeridos. Verifica que el archivo contenga las columnas "nombre" y "correo"')
          return
        }

        type UniqueEmails = Record<string, boolean>

        const uniqueEmails: UniqueEmails = {}

        // Filtrar usuarios únicos por email
        const uniqueUsers = excelUsers.filter(user => {
          const email = user.email.toLowerCase()

          if (!uniqueEmails[email]) {
            uniqueEmails[email] = true
            return true
          }
          return false
        })

        const users: User[] = uniqueUsers.map((user) => ({
          id: 'new',
          name: user.name,
          email: user.email,
          isActive: true,
          roleId: role.id,
          createdAt: Date.now().toString(),
          role
        }))

        setUsersToUpload(users)
      }
    }

    reader.readAsBinaryString(file)
  }

  const handleSubmitUser = async (emailToFind: string) => {
    const user = usersToUpload.find(user => user.email === emailToFind)
    if (user == null) return

    const { email, name, roleId, isActive } = user

    const url = new URL(`${location.origin}/admin/users/invite-user`)
    url.searchParams.append('email', email)
    url.searchParams.append('name', name)
    url.searchParams.append('role_id', roleId)
    url.searchParams.append('is_active', isActive.toString())
    const response = await fetch(url.toString())
    if (response.status !== 200) {
      toast.error(`Error al crear el usuario ${email}`)
      return
    }
    toast.success(`Usuario ${email} creado correctamente`)
    const filteredUsers = usersToUpload.filter(user => user.email !== email)
    setUsersToUpload(filteredUsers)
  }
  return (
    <main className="flex flex-col justify-center items-center sm:px-20 px-10 sm:ml-64 sm:mt-5">
      <section className="flex w-full max-w-7xl items-center justify-between flex-col">
        <h3 className="font-bold text-md text-primary text-center">Carga Masiva de Usuarios</h3>
        <form className="mt-10 flex w-full justify-between sm:flex-row flex-col">
          <div className="flex flex-col w-full justify-center items-center mt-5">
            <label htmlFor="fileInput" className="bg-primary rounded-md px-5 py-3 text-white hover:bg-primary-light hover:border hover:border-secondary text-center cursor-pointer">Seleccionar archivo</label>
            <input className="hidden" type="file" id="fileInput" accept=".xlsx, .xls" onChange={handleFileChange} />
            <div className='flex flex-col m-4 text-center items-center justify-center'>
              <span className="mt-1 text-gray-600 text-xs sm">Únicamente archivos Excel: .xls, .xlsx</span>
              <a className="mt-1 text-primary text-xs sm underline" href="/assets/plantilla-usuarios.xlsx" download>Descargar plantilla</a>
            </div>
          </div>
        </form>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-full my-10">
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
              {usersToUpload.length > 0 && usersToUpload.map(user => (
                <tr key={user.email} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                  <td className="px-6 py-4 flex items-center justify-center gap-x-2">
                    <button className='text-primary hover:rounded-full p-2 hover:bg-secondary' type='button' onClick={() => { handleRemoveUser(user.email) }}>
                      <TrashIcon />
                    </button>
                    <button className='text-primary hover:rounded-full p-2 hover:bg-secondary' type='button' onClick={() => { handleSubmitUser(user.email) }}>
                      <UploadIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {usersToUpload.length === 0 &&
          <div className='flex flex-col'>
            <span className="text-primary text-sm ">{'¡Comienza a cargar usuarios!'}</span>
          </div>}
      </section>
      <Toaster position="top-center" theme='dark' />
    </main>
  )
}
