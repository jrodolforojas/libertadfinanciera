'use client'

import { type UserFormValues } from '@/types/form/user'
import { type Role } from '@/types/role'
import { type User } from '@/types/user'
import { Select, SelectItem } from '@tremor/react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation'

const userFormSchema = yup.object({
  email: yup.string().email('Ingrese un correo electrónico válido').required('Correo electrónico es un campo requerido'),
  name: yup.string().required('Nombre es un campo requerido')
})

export default function UserForm({ user, roles }: {
  user: User
  roles: Role[] | undefined
}) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [role, setRole] = useState<string>(user.roleId)
  const [isActive, setIsActive] = useState<boolean>(user.isActive)

  const { register, handleSubmit, formState: { errors } } = useForm<UserFormValues>({
    defaultValues: user,
    resolver: yupResolver(userFormSchema)
  })

  const handleOnChangeIsActive = () => {
    setIsActive(!isActive)
  }

  const createUser = async (data: UserFormValues) => {
    const insertResponse = await supabase.from('users').insert({
      name: data.name,
      email: data.email,
      role_id: role,
      is_active: isActive
    }).select()
    if (insertResponse.error !== null) {
      toast.error('Error al crear el usuario')
      return
    }
    toast.success('Usuario creado correctamente')
    router.replace(`/admin/users/invite-user?email=${data.email}&name=${data.name}`)
    router.refresh()
  }

  const updateUser = async (data: UserFormValues) => {
    const response = await supabase.from('users').update({
      name: data.name,
      email: data.email,
      role_id: role,
      is_active: isActive
    }).eq('id', user.id)
    if (response.error !== null) {
      toast.error('Error al actualizar el usuario')
      return
    }
    toast.success('Usuario actualizado correctamente')
    router.refresh()
    router.replace('/admin/users')
  }
  const onSubmit: SubmitHandler<UserFormValues> = (data) => {
    (user.id !== 'new') ? updateUser(data) : createUser(data)
  }
  return (
    <main className="flex flex-col justify-center items-center sm:px-20 px-10 sm:ml-64 sm:mt-5">
      <section className="flex w-full max-w-7xl items-center justify-between flex-col">
        <h3 className="font-bold text-md text-primary text-center">{user.id !== 'new' ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
        <form className="flex flex-1 w-full items-start justify-start my-10 flex-col gap-y-4">
          <div className="w-full flex flex-col">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary dark:text-white">Correo electrónico</label>
            <input type="email" id="email" {...register('email')}
              className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="usuario@finanzasconrobertoolivas.com" />
            {errors.email && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email.message}</span>}
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-primary dark:text-white">Nombre</label>
            <input type="name" id="name" {...register('name')}
              className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Roberto Olivas" />
            {errors.name && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.name.message}</span>}
          </div>
          <div className="w-full flex flex-col">
            <label className="block mb-2 text-sm font-medium text-primary dark:text-white">Estado</label>
            <label className="relative inline-flex items-center mb-4 cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={isActive} onChange={handleOnChangeIsActive} />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isActive ? 'Activo' : 'Inactivo'}</span>
            </label>
          </div>
          <div className="w-full flex flex-col">
            <label className="block mb-2 text-sm font-medium text-primary dark:text-white">Rol</label>
            {roles &&
              <Select value={role} onValueChange={setRole}>
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
        <button type="button" onClick={handleSubmit(onSubmit)} className="w-full text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none
              focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-10">Guardar</button>
      </section>
      <Toaster position="top-center" theme='dark' />
    </main>
  )
}
